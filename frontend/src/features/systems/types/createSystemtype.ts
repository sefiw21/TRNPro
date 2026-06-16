export interface Company {
    id: string;
    creatorId: string;
    systemName: string;
    logoPublicId?: string;
    description?: string;
    systemType: "family" | "office" | null;
    logoUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}
//  Generic API Response Wrapper
export interface MApiResponse<T = any> {
    success: boolean;
    message?: string;
    error?: string;
    data?: T;
    count?: number;
}