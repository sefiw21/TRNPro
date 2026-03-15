import { api } from "../../../api/axiosClient.ts";
import type { ApiResponse, User } from "../../../types/index.ts";
import type { LoginSchemaType, SignupSchemaType } from "../schemas.tsx";
export const userAPI = {
  // Create a new user
  async createUser(userData: SignupSchemaType): Promise<ApiResponse<User>> {
    console.log("data userAPI creat user :", userData);

    const response = await api.post<ApiResponse<User>>("/auth/register", {
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
    });
    return response.data;
  },
  async googleLogin(accessToken: string): Promise<ApiResponse<User>> {
    console.log("Sending google token to backend");
    const response = await api.post<ApiResponse<User>>("/auth/google", {
      token: accessToken,
    });
    return response.data;
  },
  // Login a user
  async login(loginData: LoginSchemaType): Promise<ApiResponse<User>> {
    console.log("user data to log in :", loginData)
    const response = await api.post<ApiResponse<User>>("/auth/login", {
      email: loginData.email,
      password: loginData.password,
    });
    console.log("ApiResponse:",response)
    return response.data;
  },
  // Logout a user
  async logOut() {
    console.log("logout api called!!!");
    await api.get("/auth/logout");
  },
  
};
