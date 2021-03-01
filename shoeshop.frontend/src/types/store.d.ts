declare namespace REDUX_STORE {
  interface Pagination {
    itemsPerPage: number;
    currentPage: number;
    totalItems: number;
    itemCount?: number;
    totalPages?: number;
  }
  interface Profile {}
  interface State {
    isMobile: boolean;
    openCartDrawer: boolean;
    profile?: Profile;
  }
  interface IProductItem {
    id: string;
    pk: number;
    category: string;
    title: string;
    currentPrice: number;
    originalPrice: number;
    thumbnail: string;
    createdAt?: Date;
  }
  interface INewsItem {
    image: string;
    name: string;
    currentPrice: number;
    originalPrice: number;
  }
}
