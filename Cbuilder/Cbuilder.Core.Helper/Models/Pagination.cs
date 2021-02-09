using Cbuilder.Core.Helper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Cbuilder.Core.Helper.Models
{
    public abstract class PagedResultBase
    {
        public int CurrentPage { get; set; }

        public int PageCount { get; set; }

        public int PageSize { get; set; }

        public int RowCount { get; set; }
        public string LinkTemplate { get; set; }

        public int FirstRowOnPage
        {

            get { return (CurrentPage - 1) * PageSize + 1; }
        }

        public int LastRowOnPage
        {
            get { return Math.Min(CurrentPage * PageSize, RowCount); }
        }
    }

    public class PagedResult<T> : PagedResultBase
    {
        public IList<T> Results { get; set; }

        public PagedResult()
        {
            Results = new List<T>();
        }
    }

    public static class PagedResultExtensions
    {
        public static PagedResult<T> GetPaged<T>(this IList<T> results, int page, int pageSize, int rowTotal)
        {
            var result = new PagedResult<T>
            {
                CurrentPage = page,
                PageSize = pageSize,
                RowCount = rowTotal
            };
            if (results != null)
            {
                result.Results = results;
                result.PageSize = results.Count();
            }
            var pageCount = (double)result.RowCount / pageSize;
            result.PageCount = (int)Math.Ceiling(pageCount);
            return result;
        }
    }
}

