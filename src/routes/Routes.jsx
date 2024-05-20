import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage";
import Home from "../home/Home";
import PageMenu from "../pages/PageMenu";
import Order from "../pages/Order";
import Register from "../authentication/Register";
import Login from "../authentication/Login";
import PrivateRoutes from './PrivateRoutes';
import Carts from "../pages/Carts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <PageMenu />,
      },
      {
        path: "/order/:category",
        //element: <Order />,
        element: <PrivateRoutes><Order /> </PrivateRoutes>,
      },
      {
        path: "/carts",
        //element: <Order />,
        element: <PrivateRoutes><Carts /> </PrivateRoutes>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);