import { useEffect, useState } from "react";
import type { User } from "../../../types/index.ts";
import { AdminServiceAPI } from "../service/AdminService.ts";

export const useUsers = () => {
  const [usersList, setUsersList] = useState<User[] | undefined>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users from API...");
        const response = await AdminServiceAPI.getAllUsers();
        console.log("API response received:", response.success);
        if (response && response.users) {
          setUsersList(response.users);
        } else {
          console.error("API Error:", response.error || response.message);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);
  return usersList;
};
