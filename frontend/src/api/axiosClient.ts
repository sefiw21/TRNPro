import axios, { type AxiosInstance } from "axios";

// send json files only
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8081/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true, // Sends cookies across ports!
});

// sent file that include other than json like media files
const fileApi = axios.create({
  baseURL: "http://localhost:8081/api/",
  headers: { "Content-Type": undefined },
  withCredentials: true,
});
export { api, fileApi };

