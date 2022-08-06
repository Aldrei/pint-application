export interface IServiceRequest {
  statusCode?: number;
  statusText?: string;
  status: 'idle' | 'loading' | 'failed' | 'success';
  attempts?: number;
  data?: object;
}