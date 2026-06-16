import { api } from "@/api/axiosClient";
import type { SystemFormType } from "@/features/systems/schema/FormSchema";
import type { Company, MApiResponse } from "../types/createSystemtype";

export const createSystemAPI = {

    async createSystem(formData: SystemFormType): Promise<MApiResponse<Company>> {
        try {
            console.log("formData info : ", formData)

            console.log("/management/createSystem")
            const response = await api.post<MApiResponse<Company>>(
                "/management/createSystem",
                formData
            );
            return response.data;
        } catch (error: any) {

            throw new Error(
                error.response?.data?.message || "Failed to create system. Please try again."
            );
        }
    },

    async getUserSystems(): Promise<MApiResponse<Company[]>> {
        try {
            console.log("/management/getserSystems")
            const response = await api.get<MApiResponse<Company[]>>(
                "/management/getSystem",
            );
            console.log("getSystem: ", response.data.data)
            return response.data;
        } catch (error: any) {

            throw new Error(
                error.response?.data?.message || "Failed to get system. Please try again."
            );
        }
    },

    async getSingleSystem(systemId?: string): Promise<MApiResponse<Company>> {
        try {
            console.log("/management/getSingleSystem")
            const response = await api.get<MApiResponse<Company>>(
                `/management/getSingleSystem/${systemId}`,
            );
            console.log("getSingleSystem: ", response.data.data)
            return response.data;
        } catch (error: any) {

            throw new Error(
                error.response?.data?.message || "Failed to get system. Please try again."
            );
        }
    },
    async deleteSingleSystem(systemId?: string): Promise<MApiResponse<Company>> {
        try {
            console.log("/management/deleteSingleSystem")
            const response = await api.delete<MApiResponse<Company>>(
                `/management/deleteSingleSystem/${systemId}`,
            );
            console.log("deleteSingleSystem: ", response.data.data)
            return response.data;
        } catch (error: any) {

            throw new Error(
                error.response?.data?.message || "Failed to delete system. Please try again."
            );
        }
    },
    async updateSystem(systemId?: string, updates?: Partial<SystemFormType>): Promise<MApiResponse<Company>> {
        try {
            console.log("/management/deleteSingleSystem")
            const response = await api.delete<MApiResponse<Company>>(
                `/management/deleteSingleSystem/${systemId}/${updates}`,
            );
            console.log("deleteSingleSystem: ", response.data.data)
            return response.data;
        } catch (error: any) {

            throw new Error(
                error.response?.data?.message || "Failed to delete system. Please try again."
            );
        }
    },
};