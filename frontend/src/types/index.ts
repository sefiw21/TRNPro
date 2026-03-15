export interface User {
  id: string; // Changed to 'string' (UUIDs from Drizzle are strings, not numbers!)
  fullName: string; // Changed from full_name
  email: string;
  profilePicture: string;
  role: "user" | "admin";
  createdAt: string; // Changed from created_at
  updatedAt?: string; // Changed from updated_at
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
