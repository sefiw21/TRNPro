import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
  // We also need to add it here because interceptors 
  // often look at the 'InternalAxiosRequestConfig'
//   export interface InternalAxiosRequestConfig {
//     skipAuthRefresh?: boolean;
//   }
}