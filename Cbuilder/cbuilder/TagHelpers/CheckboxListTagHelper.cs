using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Cbuilder.TagHelpers
{
    [HtmlTargetElement("checkboxlist", TagStructure = TagStructure.NormalOrSelfClosing)]
    public class CheckBoxListTagHelper : TagHelper
    {
        [HtmlAttributeName("list-item")]
        public List<SelectListItem> ListItem { get; set; }
        [HtmlAttributeName("group-name")]
        public string GroupName { get; set; }
        public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {
            if (ListItem == null || string.IsNullOrEmpty(GroupName))
            {
                return;
            }
            output.TagName = "";
            string idPrefex = "chk" + GroupName;
            int counter = 1;
            output.Content.AppendHtml("<div class='formvalue formvalue-vertical'>");
            foreach (SelectListItem item in ListItem)
            {
                string id = idPrefex + counter;
                output.Content.AppendHtml("<div class='sfCheckbox'>");
                output.Content.AppendHtml("<input class='form-checkbox' type='checkbox' id='");
                output.Content.AppendHtml(id);
                output.Content.AppendHtml("' value='");
                output.Content.AppendHtml(item.Value);
                output.Content.AppendHtml("' name='");
                output.Content.AppendHtml(GroupName);
                output.Content.AppendHtml("'");
                if (item.Selected)
                    output.Content.AppendHtml(" checked='checked' ");
                output.Content.AppendHtml("/><label class='sfCheckboxlabel' for='");
                output.Content.AppendHtml(id);
                output.Content.AppendHtml("'>");
                output.Content.AppendHtml(item.Text);
                output.Content.AppendHtml("</label></div>");
                counter++;
            }
            output.Content.AppendHtml("</div>");
        }
    }
}
