export interface IFilterRequest{
    pageIndex: number;
    pageSize: number;
    filtro: string;
    order?: string | null;
    orderDirection?: string | null;
}
export interface IPaginatedResponse<T> {
  items: T[];
  total: number;
  pageIndex: number;
  pageSize: number;
}