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
  type User = BaseResponse & {
    id: string;
    email: string;
    status: string;
  };
  // Sign in
  type SignInParams = {
    email: string;
    password: string;
  };
  type SignInResponse = {
    token: string;
    expires: number;
    refresh_token: string;
    user: User;
  };
  // Sign up
  type SignUpParams = {
    email: string;
    password: string;
  };
}
