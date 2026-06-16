import { create } from 'zustand';

interface CreateSystemStore {
    selectedType: "family" | "office" | null;
    isDetailModalOpen: boolean;
    isFormModalOpen: boolean;

    openDetails: (type: "family" | "office") => void;
    closeDetails: () => void;

    proceedToForm: () => void;
    closeForm: () => void;

    reset: () => void;
}

export const useCreateSystemStore = create<CreateSystemStore>((set) => ({
    // 1. Initial State
    selectedType: null,
    isDetailModalOpen: false,
    isFormModalOpen: false,

    // 2. Open Actions
    openDetails: (type) => set({
        selectedType: type,
        isDetailModalOpen: true
    }),


    closeDetails: () => set({ isDetailModalOpen: false }),
    closeForm: () => set({ isFormModalOpen: false }),

    // 4. Flow Transition
    proceedToForm: () => set({
        isDetailModalOpen: false,
        isFormModalOpen: true
    }),

    reset: () => set({
        isDetailModalOpen: false,
        isFormModalOpen: false,
        selectedType: null
    })
}));