import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { Company } from '../types/createSystemtype';
interface SystemStore extends Company {
    setSystemValues: (system: Company) => void;
    resetSystem: () => void;
}

const useSystemStore = create<SystemStore>((set) => ({
    // Initial State (For ONE active system)
    systemId: "",
    systemName: "",
    description: "",
    systemType: null,
    logoUrl: "",
    logoPublicId: "",
    creatorId: "",

    setSystemValues: (system) => set({ ...system }),

    // Reset function
    resetSystem: () => set({
        systemId: "",
        systemName: "",
        description: "",
        systemType: null,
        logoUrl: "",
        logoPublicId: "",
        creatorId: "",
    }),
}));

// Now export them as an object using useShallow
export const useSystemActions = () => useSystemStore(
    useShallow((state) => ({
        setSystemValues: state.setSystemValues,
        resetSystem: state.resetSystem,
    }))
);


//  Grouping Logo Data with useShallow
export const useSystemLogoData = () => useSystemStore(
    useShallow((state) => ({
        logoUrl: state.logoUrl,
        logoPublicId: state.logoPublicId,
    }))
);

//  Grouping Timestamps with useShallow
export const useSystemTimestamps = () => useSystemStore(
    useShallow((state) => ({
        createdAt: state.createdAt,
        updatedAt: state.updatedAt,
    }))
);

//  Grouping Core Display Info with useShallow
export const useSystemDisplayInfo = () => useSystemStore(
    useShallow((state) => ({
        systemName: state.systemName,
        description: state.description,
        systemType: state.systemType,
    }))
);

// Assuming your store is named 'useSystemStore' internally

// Required fields
export const useSystemId = () => useSystemStore((state) => state.systemId);
export const useSystemName = () => useSystemStore((state) => state.systemName);
export const useSystemType = () => useSystemStore((state) => state.systemType);
export const useCreatorId = () => useSystemStore((state) => state.creatorId);

// Optional fields
export const useLogoPublicId = () => useSystemStore((state) => state.logoPublicId);
export const useSystemDescription = () => useSystemStore((state) => state.description);
export const useLogoUrl = () => useSystemStore((state) => state.logoUrl);
export const useCreatedAt = () => useSystemStore((state) => state.createdAt);
export const useUpdatedAt = () => useSystemStore((state) => state.updatedAt);