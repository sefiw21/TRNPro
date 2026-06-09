import { fileApi } from "@/api/axiosClient";
import type { Company, MApiResponse } from "../types/createSystemtype";

export const createSystemAPI = {

    async createSystem(formData: FormData): Promise<Company> {
        if (import.meta.env.DEV) {
            for (let [key, value] of formData.entries()) {
                console.log(`[FormData Entry] ${key}:`, value);
            }
        }
        try {
            const { data } = await fileApi.post<MApiResponse<Company>>(
                "/management/createSystem",
                formData
            );
            console.log(data)
            return data.data!;
        } catch (error: any) {

            throw new Error(
                error.response?.data?.message || "Failed to create system. Please try again."
            );
        }
    },
};