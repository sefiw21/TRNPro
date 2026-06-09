// /home/sefiw/desktop/projects/TRNpro/frontend/src/main.tsx
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SidebarContextProvider } from "./components/layouts/sidebar/context/SidebarContext.tsx";
import { AuthProvider } from "./features/auth/providers/AuthProvider.tsx";
import "./index.css";
import { router } from "./routes/AppRouters.tsx";

// 2. CREATE THE INSTANCE OF QUERYCLIENT
// Always define this OUTSIDE of the component/render tree. 
// If defined inside, it would wipe out and recreate your entire data cache on every re-render.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevents data refetching every time you click back into the browser window
      refetchOnWindowFocus: false,
      // If a request fails, it waits a moment and tries 1 more time before failing
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // 3. WRAP EVERYTHING WITH THE QUERYCLIENTPROVIDER
  // This acts as the global wrapper that feeds the cache state to your hooks down below
  <QueryClientProvider client={queryClient}>
    <SidebarContextProvider>
      <GoogleOAuthProvider clientId="297990258543-oskae6mguo2nimvfe1lk4c0kbuev069f.apps.googleusercontent.com">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </GoogleOAuthProvider>
    </SidebarContextProvider>
  </QueryClientProvider>
);