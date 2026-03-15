import { api } from "../../../api/axiosClient.ts";
import type { ApiResponse, User } from "../../../types";
import type { SignupType } from "../../auth/schemas.tsx";
export const AdminServiceAPI = {
  async getAllUsers(): Promise<ApiResponse<User[]>> {
    const response = await api.get<ApiResponse<User[]>>("auth/getAllUsers");
    return response.data;
  },

  // Get one user by ID
  async getUserById(id: number): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  },

  // Update a user
  async updateUser(
    id: number,
    userData: Partial<SignupType>,
  ): Promise<ApiResponse<User>> {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, {
      full_name: userData.fullName,
      email: userData.email,
    });
    return response.data;
  },

  // Delete a user
  async deleteUser(id: number): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(`/users/${id}`);
    return response.data;
  },
};
