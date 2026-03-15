import { jwtDecode } from "jwt-decode";
interface CustomPayload {
  id: string;
  email: string;
  role: string;
  exp: number;
}

export const getUserRole = (token: string | null): string | null => {
  if (!token) return null;
  try {
    const decoded = jwtDecode<CustomPayload>(token);
    return decoded.role;
  } catch (error) {
    return null;
  }
};
