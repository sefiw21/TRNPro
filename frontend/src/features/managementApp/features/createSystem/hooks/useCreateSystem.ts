
import { createSystemAPI } from '@/features/managementApp/features/createSystem/service/createSystem.service';
import type { Company } from '@/features/managementApp/features/createSystem/types/createSystemtype';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Custom hook to handle the creation lifecycle of a system organization.
 * Integrates Axios streaming payload directly with TanStack cache synchronization.
 */
export function useCreateSystem() {
    const queryClient = useQueryClient();

    return useMutation({
        // 1. Core action execution mapping
        mutationFn: (formData: FormData) => createSystemAPI.createSystem(formData),

        // 2. Pre-flight mutation lifecycle
        onMutate: async (variables) => {
            // Pro-Tip: You could insert an optimistic UI update here if necessary
            if (import.meta.env.DEV) {
                console.log("[Mutation Started] Dispatching multipart payload to server...");
            }
        },

        // 3. Post-execution success lifecycle
        onSuccess: (data: Company) => {
            if (import.meta.env.DEV) {
                console.log("[Mutation Success] Server state synced:", data);
            }

            // CRITICAL FOR PERFORMANCE: Invalidate queries to trigger background refetching
            // Replace 'systems-list' with the actual cache query key you use on your dashboard
            queryClient.invalidateQueries({ queryKey: ['systems-list'] });

            // NOTE FOR PRODUCTION: This is the perfect place to drop UI enhancements like:
            // - toast.success("System initialized beautifully!"); (e.g., using sonner or react-hot-toast)
            // - useNavigate to automatically redirect them to the new dashboard page
        },

        // 4. Fallback exception lifecycle
        onError: (error: Error) => {
            if (import.meta.env.DEV) {
                console.error("[Mutation Failed] Error caught in hook layer:", error.message);
            }
            // NOTE FOR PRODUCTION: Drop a global alert here if needed:
            // toast.error(error.message);
        },
    });
}