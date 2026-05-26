import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/styles/index.scss";
import App from "./app/ui/app.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import WelcomePage from "@src/pages/welcome-page";
import { loadWelcomePageAccess } from "@src/pages/welcome-page/model/load-welcome-page-access.ts";
import MainPage from "@src/pages/main-page";
import { loadMainPageAccess } from "@src/pages/main-page/model/load-main-page-access.ts";
import { routes } from "@src/shared/routes/routes.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={`/${routes.main}`} replace />,
      },
      {
        index: true,
        path: `/${routes.welcome}`,
        element: <WelcomePage />,
        loader: loadWelcomePageAccess,
      },
      {
        path: `/${routes.main}`,
        element: <MainPage />,
        loader: loadMainPageAccess,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
