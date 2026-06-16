import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSystemAPI } from "../../service/System.service";
import { systemKeys } from "./useSystemInfo";

export function useDeleteSystem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (systemId: string) => {
            const response = await createSystemAPI.deleteSingleSystem(systemId);
            return response.data;
        },

        onMutate: async (systemId) => {
            if (import.meta.env.DEV) {
                console.log(`[Mutation Started] Deleting system ID: ${systemId}`);
            }
            // Optional Pro-Tip: You can fire a loading toast here if the request takes a long time
            // const toastId = toast.loading("Deleting system...");
            // return { toastId };
        },

        onSuccess: () => {
            // 1. Sync the UI with the backend
            queryClient.invalidateQueries({ queryKey: systemKeys.systemList() });

            // 2. Provide positive UX feedback
            toast.success("System deleted successfully!");
        },

        onError: (error: any) => {
            if (import.meta.env.DEV) {
                console.error("[Mutation Failed] Error deleting system:", error);
            }
            const errorMessage = error?.response?.data?.message || "Failed to delete system. Please try again.";
            toast.error(errorMessage);
        },

        onSettled: () => {
            // 4. Fallback synchronization
            // Some developers prefer to put invalidateQueries here instead of onSuccess.
            // This ensures that even if the request fails, your frontend fetches the absolute 
            // latest state from the database just to be 100% sure the UI isn't out of sync.
        }
    });
}