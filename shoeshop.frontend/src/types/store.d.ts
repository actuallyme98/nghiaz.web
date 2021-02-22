declare namespace REDUX_STORE {
  type Pagination = {
    itemsPerPage: number;
    currentPage: number;
    totalItems: number;
    itemCount?: number;
    totalPages?: number;
  };
  type Profile = {};
  type State = {
    profile?: Profile;
  };
}
