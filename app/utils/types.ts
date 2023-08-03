export interface RouteInterface {
  id: string;
  label: string;
  url: string;
}

export interface TableColumnInterface {
  label: string;
  accessor: string;
}

export interface SearchParamsInterface {
  search?: string;
  brand?: string | string[];
  // Dash seperated value e.g.: 0-500
  priceRange?: string | string[];
  category?: string | string[];
  skip?: string;
  page?: string;
}
