interface SortOption {
  id: number;
  label: string;
  value: '-currentPrice' | 'currentPrice' | '-createdAt' | '-priority';
}

export const sortOptions: SortOption[] = [{
  id: 1,
  label: 'Giá giảm dần',
  value: '-currentPrice'
}, {
  id: 2,
  label: 'Giá tăng dần',
  value: 'currentPrice'
}, {
  id: 3,
  label: 'Mới nhất',
  value: '-createdAt',
}, {
  id: 4,
  label: 'Nổi bật',
  value: '-priority'
}];