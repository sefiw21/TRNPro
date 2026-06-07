import { create } from 'zustand';

interface CreateSystemStore {
    // --- STATE ---
    selectedType: "family" | "office" | null;
    isDetailModalOpen: boolean;
    isFormModalOpen: boolean;

    // --- ACTIONS ---
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

    // 3. Individual Close Actions
    // Notice we DO NOT clear `selectedType` here. 
    // If a user accidentally closes the modal and clicks it again, it feels faster because the state is preserved.
    closeDetails: () => set({ isDetailModalOpen: false }),
    closeForm: () => set({ isFormModalOpen: false }),

    // 4. Flow Transition
    proceedToForm: () => set({
        isDetailModalOpen: false,
        isFormModalOpen: true
    }),

    // 5. Complete Reset (The "Nuclear Option")
    // Use this when the form is successfully submitted, or if you want to completely wipe the slate clean.
    reset: () => set({
        isDetailModalOpen: false,
        isFormModalOpen: false,
        selectedType: null
    })
}));