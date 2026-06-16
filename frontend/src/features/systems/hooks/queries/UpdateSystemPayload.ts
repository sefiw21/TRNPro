// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import type { SystemFormType } from "../../schema/FormSchema";
// import { createSystemAPI } from "../../service/System.service";
// import type { Company } from "../../types/createSystemtype";

// // Define what data we need to perform an update
// interface UpdateSystemPayload {
//     id: string;
//     updates: Partial<SystemFormType>;
// }

// export function useUpdateSystem() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         // Destructure the id and updates from our payload
//         mutationFn: async ({ id, updates }: UpdateSystemPayload) => {
//             const response = await createSystemAPI.updateSystem(id, updates);
//             return response.data as Company;
//         },

//         onMutate: async (variables) => {
//             if (import.meta.env.DEV) {
//                 console.log(`[Mutation Started] Updating system ${variables.id} with:`, variables.updates);
//             }
//         },

//         onSuccess: (updatedSystem: Company) => {
//             if (import.meta.env.DEV) console.log("[Mutation Success] System updated:", updatedSystem);

//             // Invalidate the list to show the new name/description
//             queryClient.invalidateQueries({ queryKey: ['systems-list'] });

//             // PRO TIP: If you have a query for a single system view, invalidate that too!
//             queryClient.invalidateQueries({ queryKey: ['system-detail', updatedSystem.id] });
//         },

//         onError: (error: Error) => {
//             if (import.meta.env.DEV) console.error("[Mutation Failed] Update error:", error.message);
//         },
//     });
// }