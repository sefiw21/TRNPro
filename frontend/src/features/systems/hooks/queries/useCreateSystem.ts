
import { createSystemAPI } from '@/features/systems/service/System.service';
import type { Company } from '@/features/systems/types/createSystemtype';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateSysetemData {
    orgType: "family" | "office" | null;
    systemName: string;
    description?: string;
}
export function useCreateSystem() {
    const queryClient = useQueryClient();

    return useMutation({
        // 1. Make mutationFn async so we can unwrap the response
        mutationFn: async (formData: CreateSysetemData) => {
            const response = await createSystemAPI.createSystem(formData);
            return response.data as Company;
        },

        onMutate: async (variables) => {
            if (import.meta.env.DEV) {
                console.log("[Mutation Started] Dispatching payload:", variables);
            }
        },

        // 3. Now, 'data' is guaranteed to be just the Company object!
        onSuccess: (data: Company) => {
            if (import.meta.env.DEV) {
                console.log("[Mutation Success] Server state synced:", data);
            }
            queryClient.invalidateQueries({ queryKey: ['systems-list'] });
        },

        onError: (error: Error) => {
            if (import.meta.env.DEV) {
                console.error("[Mutation Failed] Error caught in hook layer:", error.message);
            }
        },
    });
}