export interface IServiceRequest {
  statusCode?: number;
  status: 'idle' | 'loading' | 'failed' | 'success';
  attempts?: number;
  error?: object;
}