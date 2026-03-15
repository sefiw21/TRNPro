import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { studentAPI } from "../../../api/S_api";
import {
  BATCH_YEARS,
  departments,
  studentFormSchema,
  type StudentFormData,
} from "../schemas/studentFormSchema";

export const useStudentForm = (Family: string, GrandFamily: string) => {
  const [photoUploadStatus, setPhotoUploadStatus] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Use the Zod schema type
  const formMethods = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    mode: "onChange",
    defaultValues: {
      family: Family,
      grand_family: GrandFamily,
      photo: undefined,
    },
    resetOptions: {},
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = formMethods;

  // Set family values from props
  useEffect(() => {
    setValue("family", Family);
    setValue("grand_family", GrandFamily);
  }, [Family, GrandFamily, setValue]);

  // Watch Amharic field names
  const selectedGender = watch("gender");
  const isDeacon = watch("isDeacon");

  useEffect(() => {
    if (selectedGender === "ሴት") {
      setValue("isDeacon", false);
    }
  }, [selectedGender, setValue]);

  const onSubmit = async (data: StudentFormData) => {
    console.log("Form submission data - FULL OBJECT:", data);
    setIsSubmitting(true);
    setApiError(null);
    try {
      // Send to API
      const response = await studentAPI.createStudent(data);

      if (response?.success && response?.data) {
        // Successful: show success state and reset form
        setSubmitSuccess(true);

        reset({
          ...data,
          photo: undefined, // just clear the photo
          isDeacon: false,
        });
        setTimeout(() => setSubmitSuccess(false), 6000);
        console.log("Student saved successfully:", response.data);
      } else {
        setApiError(
          response?.error || response?.message || "Failed to save student",
        );
        console.error("Backend error:", response?.error || response?.message);
      }
    } catch (error: any) {
      // Network or unexpected error

      setApiError(
        error?.response?.data?.error ||
          error?.message ||
          "Network or server error",
      );
      console.error("Request failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewFile = useCallback(
    (image: File) => {
      if (!image.type.startsWith("image/")) {
        console.error("እባክዎ የምስል ፋይል ይምረጡ");
        return;
      }
      setValue("photo", image);
      const objectUrl = URL.createObjectURL(image);
      setPreviewImage(objectUrl);
      console.log(objectUrl);
      //  Clean up previous URL to prevent memory leak
      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    },
    [setValue],
  );
  //handle photo uploade
  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploadStatus(true);
    setUploadedFile(file);
    previewFile(file);
    setPhotoUploadStatus(false);
  };

  return {
    // State
    isSubmitting,
    submitSuccess,
    apiError,
    // Form methods
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    reset,
    setValue,
    errors,

    // Form values
    selectedGender,
    isDeacon,

    //image related
    handlePhotoChange,
    photoUploadStatus,
    uploadedFile,
    previewImage,

    // Data
    departments,
    BATCH_YEARS,
    setApiError,
  };
};
