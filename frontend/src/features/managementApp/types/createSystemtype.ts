//  Core Model Types
export interface Company {
    id: string;
    companyName: string;
    type: "family" | "office";
    logo?: string;
    description?: string;
    createdAt?: string;
}

//  Generic API Response Wrapper
export interface MApiResponse<T> {
    success: boolean;
    message?: string;
    error?: string;
    data?: T;
    count?: number;
}