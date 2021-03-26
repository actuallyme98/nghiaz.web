export interface SearchOptions {
  code?: string;
  name?: string;
  categories?: number[];
  colors?: number[];
  sizes?: number[];
  price?: {
    start: number;
    end: number;
  };
  isSpecial: boolean;
  isSellWell: boolean;
}

export type SortOptions = '-currentPrice' | 'currentPrice' | '-createdAt' | '-priority';
