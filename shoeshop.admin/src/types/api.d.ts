declare namespace SHOESWEB_API {
  // Common
  type BaseResponse = {
    createdAt: string;
    updatedAt: string;
  };
  type PaginationParams = {
    limit?: number;
    page?: number;
  };
  type MetaPaginationResponse = {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  type LinksPaginationRespons = {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
  type PaginationResponse<T> = {
    items: T[];
    meta: MetaPaginationResponse;
    links: LinksPaginationRespons;
  };
}
