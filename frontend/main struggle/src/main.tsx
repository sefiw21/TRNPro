import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ReadingHome } from './componentes/Mental/library/home.tsx'
import NotFoundPage from './NotFoundPage.tsx'
import { Babys } from './componentes/manage_babys/babysHome.tsx'
import { LearnOralHome } from './componentes/Mental/learn_oral/home.tsx'
import { BookList } from "./componentes/Mental/library/bookList.tsx";
import SinglBook from './componentes/Mental/library/singlBook.tsx'
// import  BabyList,{}  from './componentes/manage_babys/list-of-table.tsx'
// import LibraryBooks from './componentes/Mental/library/bookList.tsx'

const counter = createBrowserRouter([
  { path: "/", element:  <App /> },
  {path:"/babys", element: <Babys /> },
  {path:"/oral-lessons", element: <LearnOralHome /> },
  {path:"/reading", element: <ReadingHome /> },
  {path:"/booklist", element: <BookList /> },
  {path:"/singlBook", element: <SinglBook />},
  // {path:"/babylist", element: <BabyList />},
  // {path:"/babylist/:id", element: <SinglBaby />},
  // {path:"/booklist", element: <LibraryBooks />},
  // {path:"/booklist/:id", element: <SinglBooks />},
  {path:"/*", element: <NotFoundPage /> },
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={counter} /> 
  </StrictMode>,
)
