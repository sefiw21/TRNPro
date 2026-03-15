import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SidebarContextProvider } from "./components/layouts/sidebar/context/SidebarContext.tsx";
import { AuthProvider } from "./providers/AuthProvider.tsx";
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import { router } from "./routes/AppRouters.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <SidebarContextProvider>
    <GoogleOAuthProvider clientId="297990258543-oskae6mguo2nimvfe1lk4c0kbuev069f.apps.googleusercontent.com">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  </SidebarContextProvider>,
  // </StrictMode>
);
