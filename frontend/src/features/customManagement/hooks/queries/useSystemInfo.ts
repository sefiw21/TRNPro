import { useQuery } from "@tanstack/react-query";
import { createSystemAPI } from "../../service/System.service";

/**
 * Query Key Factory
 * A standard best practice for keeping query keys organized, strongly typed, 
 * and easy to invalidate later without guessing string arrays.
 */
export const systemKeys = {
    all: ["system-info"] as const,
    singleSystem: (id: string | undefined) => [...systemKeys.all, "single", id] as const,
    systemList: () => [...systemKeys.all, "system-list"] as const,
};

//  Hook to fetch a single system's info.

export const useSingleSystem = (systemId: string | undefined) => {
    return useQuery({
        queryKey: systemKeys.singleSystem(systemId),
        queryFn: () => createSystemAPI.getSingleSystem(systemId),
        enabled: !!systemId,
    });

};


//  Hook to fetch all systems associated with the current user.

export const useUserSystems = () => {
    return useQuery({
        queryKey: systemKeys.systemList(),
        queryFn: createSystemAPI.getUserSystems,
    });
};