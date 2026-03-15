import { AxiosError } from "axios";
import type { StudentFormData } from "../features/management/schemas/studentFormSchema.ts";
import type { ApiResponse, StudentDisplay, StudentFromdb } from "./S_api.ts";
import { FIELD_MAPPING } from "./S_api.ts";
// --- Helper Functions ---
export const transformToFrontend = (
  student: StudentFromdb,
): StudentDisplay => ({
  id: student.id,
  family: student.family_name,
  grand_family: student.grand_family_name,
  fullName: student.full_name,
  bookName: student.book_name,
  gender: student.gender,
  isDeacon: student.is_deacon,
  zon: student.zone,
  wereda: student.wereda,
  age: student.age,
  phone: student.phone_number,
  department: student.department,
  batchYear: student.batch_year,
  photo: student.photo_url || undefined,
  registration_status: student.registration_status,
  created_at: student.created_at,
});

export const transformApiResponse = <T extends StudentFromdb | StudentFromdb[]>(
  response: ApiResponse<T>,
): ApiResponse<
  T extends StudentFromdb[] ? StudentDisplay[] : StudentDisplay
> => {
  const { data, ...rest } = response;

  if (!data) {
    return {
      ...rest,
      data: (Array.isArray(data) ? [] : {}) as any,
    };
  }

  if (Array.isArray(data)) {
    return {
      ...rest,
      data: data.map(transformToFrontend),
      count: data.length,
    } as any;
  }

  return {
    ...rest,
    data: transformToFrontend(data as StudentFromdb),
    count: 1,
  } as any;
};

export const createStudentFormData = (
  studentData: StudentFormData,
): FormData => {
  const formData = new FormData();

  Object.entries(studentData).forEach(([key, value]) => {
    const frontendKey = key as keyof StudentFormData;

    if (frontendKey === "photo") {
      if (value instanceof File) {
        formData.append("photo", value);
      } else if (typeof value === "string") {
        formData.append("photo_url", value);
      }
      return;
    }

    if (value !== undefined && value !== null) {
      const backendKey = FIELD_MAPPING[frontendKey] || frontendKey;
      const stringValue =
        typeof value === "boolean" ? value.toString() : String(value);
      formData.append(backendKey, stringValue);
    }
  });
  console.log(" Let's peek inside the FormData envelope:");
  formData.forEach((value, key) => {
    if (value instanceof File) {
      console.log(`   📁 ${key}: File(${value.name}, ${value.size} bytes)`);
    } else {
      console.log(`   📝 ${key}: ${value}`);
    }
  });

  // Also count how many items
  console.log(
    `📊 Total items in FormData: ${Array.from(formData.keys()).length}`,
  );

  return formData;
};

export const createUpdateFormData = (
  id: number,
  studentData: Partial<StudentFormData>,
): FormData => {
  const formData = new FormData();
  formData.append("id", id.toString());

  Object.entries(studentData).forEach(([key, value]) => {
    const frontendKey = key as keyof StudentFormData;

    if (frontendKey === "photo") {
      if (value instanceof File) {
        formData.append("photo", value);
      } else if (typeof value === "string") {
        formData.append("photo_url", value);
      }
      return;
    }

    if (value !== undefined && value !== null) {
      const backendKey = FIELD_MAPPING[frontendKey] || frontendKey;
      formData.append(backendKey, String(value));
    }
  });

  return formData;
};

export const handleApiError = (error: unknown): ApiResponse<any> => {
  const axiosError = error as AxiosError<ApiResponse>;

  if (axiosError.response?.data) {
    return {
      success: false,
      error:
        axiosError.response.data.error ||
        axiosError.response.data.message ||
        "Server error",
      data:
        axiosError.response.data.data ||
        (Array.isArray(axiosError.response.data.data) ? [] : {}),
    };
  }

  if (axiosError.request) {
    return {
      success: false,
      error: "No response received from server. Check your connection.",
      data: [] as any,
    };
  }

  return {
    success: false,
    error: axiosError.message || "Unknown error occurred",
    data: [] as any,
  };
};
