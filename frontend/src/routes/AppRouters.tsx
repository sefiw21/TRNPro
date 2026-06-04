import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import AdminDashboard from "../features/adminDashboard/AdminDashboard.tsx";
import LogIn from "../features/auth/components/LogIn.tsx";
import SignUp from "../features/auth/components/SignUp.tsx";
import Gates from "../features/managementApp/family/components/familyGates/Gates.tsx";
import Manage_Students from "../features/managementApp/family/GetUser/Manage_Students.tsx";
import OralApp from "../features/mental/learn_oral/OralApp.tsx";
import { LibraryApp } from "../features/mental/library/LibraryApp.tsx";
import MainContent from "../features/mental/library/MainContent.tsx";
import Mental_main from "../features/mental/Mental_main.tsx";
import Health from "../features/physical/Health.tsx";
import Income from "../features/physical/Income.tsx";
import Phisycal_main from "../features/physical/Phisycal_main.tsx";
import Prayer from "../features/spiritual/Prayer.tsx";
import Spritual_main from "../features/spiritual/Spritual_main.tsx";
import Home from "../pages/Home.tsx";

import Management from "../features/managementApp/family/GetUser/Manage_Students.tsx";
import ManagenentApp from "../features/managementApp/ManagenentApp.tsx";
import NotFoundPage from "../NotFoundPage.tsx";
import LandingPageApp from "../pages/LandingPage.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import PublicPges from "./PublicRoute.tsx";

export const router = createBrowserRouter([

  {
    element: <PublicPges />,
    children: [
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/",
        element: <LandingPageApp />,
      },
    ]
  },

  {
    element: <ProtectedRoute />,
    children: [

      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/mental",
        element: <App />,
        children: [
          { index: true, element: <Mental_main /> },
          { path: "Media", element: <OralApp /> },
          { path: "library", element: <LibraryApp /> },
          { path: "booklist", element: <MainContent /> },
        ],
      },
      {
        path: "/spiritual",
        element: <App />,
        children: [
          { index: true, element: <Spritual_main /> },
          { path: "Prayer", element: <Prayer /> },
          { path: "Health", element: <Health /> },
          { path: "Media", element: <OralApp /> },
        ],
      },
      {
        path: "/physical",
        element: <App />,
        children: [
          { index: true, element: <Phisycal_main /> },
          { path: "Prayer", element: <Prayer /> },
          { path: "Health", element: <Health /> },
          {
            path: "Income",
            element: <Income />,
          },
        ],
      },

      {
        path: "/management",
        element: <ManagenentApp />,
        children: [
          { index: true, element: <Management /> },
          { path: "Gates", element: <Gates /> },
        ],
      },
      {
        path: "/choose_family",
        element: <Gates />,
      },
      { path: "/Family", element: <Manage_Students /> },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },


]);
