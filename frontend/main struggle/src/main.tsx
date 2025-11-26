import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LibraryApp } from "./componentes/Mental/library/LibraryApp.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import { Babys } from "./componentes/manage_babys/babysHome.tsx";
import { OralApp } from "./componentes/Mental/learn_oral/OralApp.tsx";
import  MainContent  from "./componentes/Mental/library/MainContent.tsx";
import SinglBook from "./componentes/Mental/library/singlBook.tsx";
import Mental_main from "./componentes/Mental/Mental_main.tsx";

import Spritual_main from "./componentes/spritual/Spritual_main.tsx";
import Prayer from "./componentes/spritual/Prayer.tsx";

import Phisycal_main from "./componentes/phisycal/Phisycal_main.tsx";
import Health from "./componentes/phisycal/Health.tsx";
import Income from "./componentes/phisycal/Income.tsx";

// import  BabyList,{}  from './componentes/manage_babys/list-of-table.tsx'
// import LibraryBooks from './componentes/Mental/library/bookList.tsx'

const counter = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/babys", element: <Babys /> },
  { path: "/oral-lessons", element: <OralApp /> },
  { path: "/Mental_main", element: <Mental_main /> },
  { path: "/reading", element: <LibraryApp /> },
  { path: "/booklist", element: <MainContent /> },
  { path: "/singlBook", element: <SinglBook /> },
  // {path:"/babylist", element: <BabyList />},
  // {path:"/babylist/:id", element: <SinglBaby />},
  // {path:"/booklist", element: <LibraryBooks />},
  // {path:"/booklist/:id", element: <SinglBooks />},

  // spitual sections
  { path: "/Spritual_main", element: <Spritual_main /> },
  { path: "/Prayer", element: <Prayer /> },

  // phisycal section
  { path: "/phisycal_main", element: <Phisycal_main /> },
  { path: "/Health", element: <Health /> },
  { path: "/Income", element: <Income /> },

  { path: "/*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={counter} />
  </StrictMode>
);
