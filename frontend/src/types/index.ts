export interface User {
  id: string;
  fullName: string;
  email: string;
  profilePicture: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt?: string;
}

// 3. API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  user?: T;
  token?: string;
  count?: number;
}

export const Categories = [
  " All",
  "Orthopedics ",
  "Obstetrics ",
  "Anesthesia",
  "Psychiatry",
  "Radiology ",
  "Dermatology ",
  "Mechanical ",
  " Engineering",
  "Electromechanical ",
  "Industrial ",
  "Computer ",
  "Software ",
  "Information ",
];
