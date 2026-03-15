import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Home from "../components/layouts/Home.tsx";
import AdminDashboard from "../features/adminDashboard/AdminDashboard.tsx";
import LogIn from "../features/auth/LogIn.tsx";
import SignUp from "../features/auth/SignUp.tsx";
import Manage_Students from "../features/management/adminInterfaces/GetUser/Manage_Students.tsx";
import Gates from "../features/management/familyGates/Gates.tsx";
import OralApp from "../features/mental/learn_oral/OralApp.tsx";
import { LibraryApp } from "../features/mental/library/LibraryApp.tsx";
import MainContent from "../features/mental/library/MainContent.tsx";
import Mental_main from "../features/mental/Mental_main.tsx";
import Health from "../features/physical/Health.tsx";
import Income from "../features/physical/Income.tsx";
import Phisycal_main from "../features/physical/Phisycal_main.tsx";
import Prayer from "../features/spiritual/Prayer.tsx";
import Spritual_main from "../features/spiritual/Spritual_main.tsx";

import NotFoundPage from "../NotFoundPage.tsx";
import LandingPageApp from "../pages/landingPage/LandingPageApp.tsx";
import { ProtectedRoute } from "../pages/ProtectedPages.tsx";
import PublicPges from "../pages/PublicPges.tsx";

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
