export interface City {
  id?: number;
  code: number;
  name: string;
  isActive: number;
}

export interface District {
  id?: number;
  cityId: number;
  code: number;
  name: string;
  isActive: number;
}

export interface Ward {
  id?: number;
  districtId: number;
  code: number;
  name: string;
  isActive: number;
}
