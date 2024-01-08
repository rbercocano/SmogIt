namespace SmogIt.Core.Domains
{
    public class PagedResult<T>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages => TotalItems == 0 ? 0 : (int)Math.Ceiling((double)TotalItems / PageSize);
        public List<T> Items { get; set; }

        public PagedResult(int pageNumber, int pageSize, int totalItems, List<T> items)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalItems = totalItems;
            Items = items;
        }
        public PagedResult<U> As<U>(List<U> items)
        {
            return new PagedResult<U>(PageNumber, TotalPages, TotalItems, items);
        }
    }
}
