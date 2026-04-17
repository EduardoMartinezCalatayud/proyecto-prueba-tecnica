export interface StatusResponse<T> {
  success: boolean;
  data: T;
  status: number;
}
