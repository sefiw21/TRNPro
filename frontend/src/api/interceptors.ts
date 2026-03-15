import { getAccessToken, setAccessToken } from "../utils/tokenUtils";
import { api } from "./axiosClient.ts";

export const setupInterceptors =  (logOutUser: () => void) => {
  // 1. REQUEST INTERCEPTOR: Attach the visitor's  AccessToken
  api.interceptors.request.use(
    (config) => {
      const token =  getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("request interceptor: Token attached.");
      }else{
      console.log("request interceptor: No token, Sending public request");
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  // 2. RESPONSE INTERCEPTOR: The Refresh Token Master Key logic
  api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("2. RESPONSE INTERCEPTOR: The Refresh Token Master Key logic", error.config)
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (originalRequest.url?.includes('/auth/refresh') || originalRequest.skipAuthRefresh) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        console.log("Access token expired or missing. Attempting refresh...");
        
        const { data } = await api.get("/auth/refresh", { skipAuthRefresh: true });
        console.log('responce from "/auth/refresh"',data)
        const newToken = data.token;
        setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed. Session is dead.");

        if (getAccessToken()) {
           logOutUser();
        }
        
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
};
