import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import { App } from "./App";
import { QortalRequests } from './QortalRequests';
import { Framework } from './Framework';
import { DocPage } from './DocPage';



const baseUrl = window?._qdnBase || "";

export function Routes() {

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <QortalRequests />,
          },
          {
            path: '/framework/:frameworkName',
            element: <Framework />, // Wrapper component
            children: [
              {
                index: true, // /framework/:frameworkName
                element: <DocPage />,
              },
              {
                path: ':pageId', // /framework/:frameworkName/:pageId
                element: <DocPage />,
              },
            ],
          }
          
        ],
      },
    ],
    {
      basename: baseUrl,
    }
  );

  return <RouterProvider router={router} />;
}
