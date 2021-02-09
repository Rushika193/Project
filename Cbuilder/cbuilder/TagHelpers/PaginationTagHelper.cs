using System;
using System.Net;
using Cbuilder.Core.Helper.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Cbuilder.TagHelpers
{
    [HtmlTargetElement("pagination", TagStructure = TagStructure.NormalOrSelfClosing)]
    public class PaginationTagHelper : TagHelper
    {
        private readonly HttpContext _httpContext;
        private readonly IUrlHelper _urlHelper;

        [ViewContext]
        public ViewContext ViewContext { get; set; }

        public PaginationTagHelper(IHttpContextAccessor accessor, IActionContextAccessor actionContextAccessor, IUrlHelperFactory urlHelperFactory)
        {
            _httpContext = accessor.HttpContext;
            _urlHelper = urlHelperFactory.GetUrlHelper(actionContextAccessor.ActionContext);
        }

        [HtmlAttributeName("pagination-model")]
        public PagedResultBase Model { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {            
            if(Model == null)
            {
                return;
            }

            if(Model.PageCount == 0)
            {
                return;
            }

            var PAGES_TO_SHOW = 5;
            var action = ViewContext.RouteData.Values["action"].ToString();
            var urlTemplate = WebUtility.UrlDecode(_urlHelper.Action(action, new { page = "{0}" }));
            var request = _httpContext.Request;
            foreach (var key in request.Query.Keys)
            {
                if (key == "page")
                {
                    continue;
                }

                urlTemplate += "&" + key + "=" + request.Query[key];
            }

            var startIndex = Math.Max((Model.CurrentPage - PAGES_TO_SHOW) - Math.Max(PAGES_TO_SHOW - (Model.PageCount - Model.CurrentPage), 0), 1);
            var finishIndex = Math.Min(Model.CurrentPage + PAGES_TO_SHOW + Math.Max(PAGES_TO_SHOW - Model.CurrentPage + 1, 0), Model.PageCount);

            output.TagName = "";
            output.Content.AppendHtml("<div class=\"sfpagination Mt-2x float-right\">");
            output.Content.AppendHtml("<ul class=\"pagination\">");
            output.Content.AppendHtml("<li  class=\"item\" ><a href=\"");
            output.Content.AppendHtml(string.Format(urlTemplate, 1));
            if (Model.CurrentPage == startIndex)
            {
                output.Content.AppendHtml("\" class=\"item-link  disabled\">");
            }
            else
            {
                output.Content.AppendHtml("\" class=\"item-link primary-link\">");
            }
            output.Content.AppendHtml("<i class=\"fa fa-angle-double-left\"></i>");
            output.Content.AppendHtml("</a>");
            output.Content.AppendHtml("</li>");
            output.Content.AppendHtml("<li  class=\"item\" ><a href=\"");
            output.Content.AppendHtml(string.Format(urlTemplate, Model.CurrentPage - 1));
            if (Model.CurrentPage == startIndex)
            {
                output.Content.AppendHtml("\" class=\"item-link primary disabled\">");
            }
            else
            {
                output.Content.AppendHtml("\" class=\"item-link primary-link\">");
            }
            output.Content.AppendHtml("<i class=\"fa fa-chevron-left\"></i>");
            output.Content.AppendHtml("</a>");
            output.Content.AppendHtml("</li>");

            for (var i = startIndex; i <= finishIndex; i++)
            {
                if (i == Model.CurrentPage)
                {
                    output.Content.AppendHtml("<li class=\"item\"><a class=\"item-link primary active\">");
                    output.Content.AppendHtml(i.ToString());
                    output.Content.AppendHtml("</li>");
                }
                else
                {
                    output.Content.AppendHtml("<li  class=\"item\" ><a href=\"");
                    output.Content.AppendHtml(string.Format(urlTemplate, i));
                    output.Content.AppendHtml("\" class=\"item-link primary-link\">");
                    output.Content.AppendHtml(i.ToString());
                    output.Content.AppendHtml("</a>");
                    output.Content.AppendHtml("</li>");
                }
            }
            output.Content.AppendHtml("<li  class=\"item\" ><a href=\"");
            output.Content.AppendHtml(string.Format(urlTemplate, Model.CurrentPage + 1));
            if (Model.CurrentPage == finishIndex)
            {
                output.Content.AppendHtml("\" class=\"item-link primary disabled\">");
            }
            else
            {
                output.Content.AppendHtml("\" class=\"item-link primary-link\">");
            }
            output.Content.AppendHtml("<i class=\"fa fa-chevron-right\"></i>");
            output.Content.AppendHtml("</a>");
            output.Content.AppendHtml("</li>");
            output.Content.AppendHtml("<li  class=\"item\" ><a href=\"");
            output.Content.AppendHtml(string.Format(urlTemplate, Model.PageCount));
            if (Model.CurrentPage == finishIndex)
            {
                output.Content.AppendHtml("\" class=\"item-link primary disabled\">");
            }
            else
            {
                output.Content.AppendHtml("\" class=\"item-link primary-link\">");
            }
            output.Content.AppendHtml("<i class=\"fa fa-angle-double-right\"></i>");
            output.Content.AppendHtml("</a>");
            output.Content.AppendHtml("</li>");
            output.Content.AppendHtml("</ul>");
            output.Content.AppendHtml("</div>");
        }

        private void AddPageLink(TagHelperOutput output, string url, string text)
        {            
            output.Content.AppendHtml("<li  class=\"item\" ><a href=\"");
            output.Content.AppendHtml(url);
            output.Content.AppendHtml("\" class=\"item-link primary-link\">");
            output.Content.AppendHtml(text);
            output.Content.AppendHtml("</a>");
            output.Content.AppendHtml("</li>");
        }

        private void AddCurrentPageLink(TagHelperOutput output, int page)
        {
            output.Content.AppendHtml("<li class=\"item\"><a class=\"item-link primary active\">");
            output.Content.AppendHtml(page.ToString());
            output.Content.AppendHtml("</li>");
        }
    }
}
