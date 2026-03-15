// services/B_api.ts - MODERN, TYPE-SAFE VERSION
import axios, { type AxiosInstance } from "axios";
import { type StudentFormData } from "../features/management/schemas/studentFormSchema.ts";
import {
  createStudentFormData,
  createUpdateFormData,
  handleApiError,
  transformApiResponse,
} from "./S_apiHelpers.ts";

// --- Core Types ---
export interface StudentFromdb {
  id: number;
  family_name: string;
  grand_family_name: string;
  full_name: string;
  book_name: string;
  gender: string;
  is_deacon: boolean;
  zone: string;
  wereda: string;
  age: number;
  phone_number: string;
  department: string;
  batch_year: string;
  registration_status?: string;
  photo_url?: string;
  cloudinary_public_id?: string;
  cloudinary_version?: string;
  cloudinary_format?: string;
  cloudinary_width?: number;
  cloudinary_height?: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface StudentDisplay {
  id: number;
  family: string;
  grand_family: string;
  fullName: string;
  bookName: string;
  gender: string;
  isDeacon: boolean;
  zon: string;
  wereda: string;
  age: number;
  phone: string;
  department: string;
  batchYear: string;
  photo?: string;
  registration_status?: string;
  created_at?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data: T;
  count?: number;
}

// --- Field Mapping Types ---
type FrontendField = keyof Omit<StudentFormData, "photo"> | "id";
type BackendField = keyof Omit<
  StudentFromdb,
  "id" | "photo_url" | "created_at" | "updated_at"
>;

export const FIELD_MAPPING: Record<FrontendField, BackendField> = {
  family: "family_name",
  grand_family: "grand_family_name",
  fullName: "full_name",
  bookName: "book_name",
  gender: "gender",
  isDeacon: "is_deacon",
  zon: "zone",
  wereda: "wereda",
  age: "age",
  phone: "phone_number",
  department: "department",
  batchYear: "batch_year",
  id: "id" as BackendField,
} as const;

// --- API Configuration ---
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 30000,
});

// --- API Methods ---
export const studentAPI = {
  // CREATE Student
  async createStudent(
    studentData: StudentFormData,
  ): Promise<ApiResponse<StudentDisplay>> {
    if (!studentData.photo) {
      return {
        success: false,
        error: "እባክዎ የተማሪ ፎቶ ይምረጡ",
        data: {} as StudentDisplay,
      };
    }
    try {
      const formData = createStudentFormData(studentData);
      const response = await api.post<ApiResponse<StudentFromdb>>(
        "/students",
        formData,
        // {
        //   headers: { "Content-Type": "multipart/form-data" },
        // },
      );

      return transformApiResponse(response.data);
    } catch (error) {
      return handleApiError(error) as ApiResponse<StudentDisplay>;
    }
  },

  // GET all students
  async getAllStudents(): Promise<ApiResponse<StudentDisplay[]>> {
    try {
      const response = await api.get<ApiResponse<StudentFromdb[]>>("/students");
      console.log("data form B_api :", response.data);
      return transformApiResponse(response.data);
    } catch (error) {
      return handleApiError(error) as ApiResponse<StudentDisplay[]>;
    }
  },

  // GET students by family
  async getStudentsByFamily(
    family: string,
  ): Promise<ApiResponse<StudentDisplay[]>> {
    try {
      const response = await api.get<ApiResponse<StudentFromdb[]>>(
        `/students/family/${encodeURIComponent(family)}`,
      );
      return transformApiResponse(response.data);
    } catch (error) {
      return handleApiError(error) as ApiResponse<StudentDisplay[]>;
    }
  },

  // GET student by ID
  async getStudentById(
    id: number | null,
  ): Promise<ApiResponse<StudentDisplay>> {
    console.log(id);

    try {
      const response = await api.get<ApiResponse<StudentFromdb>>(
        `/students/${id}`,
      );
      return transformApiResponse(response.data);
    } catch (error) {
      return handleApiError(error) as ApiResponse<StudentDisplay>;
    }
  },

  // UPDATE Student
  async updateStudent(
    id: number,
    studentData: Partial<StudentFormData>,
  ): Promise<ApiResponse<StudentDisplay>> {
    try {
      const formData = createUpdateFormData(id, studentData);
      const response = await api.put<ApiResponse<StudentFromdb>>(
        `/students/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      return transformApiResponse(response.data);
    } catch (error) {
      return handleApiError(error) as ApiResponse<StudentDisplay>;
    }
  },

  // DELETE Student
  async deleteStudent(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await api.delete<ApiResponse<void>>(`/students/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error) as ApiResponse<void>;
    }
  },

  // Upload photo
  async uploadPhoto(
    studentId: number,
    photoFile: File,
  ): Promise<ApiResponse<{ url: string }>> {
    try {
      const formData = new FormData();
      formData.append("studentId", studentId.toString());
      formData.append("photo", photoFile);

      const response = await api.post<ApiResponse<{ url: string }>>(
        "/students/upload-photo",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      return response.data;
    } catch (error) {
      return handleApiError(error) as ApiResponse<{ url: string }>;
    }
  },
};

export { api };
