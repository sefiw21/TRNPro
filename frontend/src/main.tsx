import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Toaster from "./components/Ui/feedback/Toaster.tsx";
import { AuthProvider } from "./features/auth/providers/AuthProvider.tsx";
import "./index.css";
import { router } from "./routes/AppRouters.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId="297990258543-oskae6mguo2nimvfe1lk4c0kbuev069f.apps.googleusercontent.com">
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />

      </AuthProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);