import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api } from "../api/axiosClient.ts";
import { setupInterceptors } from "../api/interceptors.ts";
import { userAPI } from "../features/auth/service/auth.service.ts";
import type { User } from "../types/index.ts";
import { setAccessToken } from "../utils/tokenUtils.ts";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showUserDetail: boolean;
  showProfileDetail: () => void;
  login: (accessToken: string, userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserDetail, setShowUserDetail] = useState<boolean>(false)

  const showProfileDetail = () => {
    console.log("user profile is clicked")
    setShowUserDetail(!showUserDetail)

  }
  const logout = async () => {
    try {
      await userAPI.logOut()
    } catch (error) {
      console.error("Failed to logout on server", error);
    } finally {
      setUser(null);
      setAccessToken(undefined);
      console.log("User logged out");
    }
  };

  // Setup Axios  when the app starts
  useEffect(() => { setupInterceptors(logout); }, []);

  // Check session on mount
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await api.get('/auth/me');
        console.log("new token : ", response.data.token);

        if (response.data && response.data.token) {
          console.log("DATA from /auth/me:", response.data.user);
          setUser(response.data.user);
          setAccessToken(response.data.token);
          console.log("User session restored successfully!");
        }
      } catch (error) {
        console.error("Session restoration failed:", error);
        setUser(null);
        setAccessToken(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const login = (accessToken: string, userData: User) => {
    setAccessToken(accessToken);
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        showUserDetail,
        showProfileDetail,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
