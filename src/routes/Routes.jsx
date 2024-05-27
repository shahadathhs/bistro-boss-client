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
import DashBoard from "../layouts/DashBoard";
import AllUsers from "../pages/AllUsers";
import AddItems from "../pages/AddItems";
import AdminRoutes from './AdminRoutes';
import ManageItems from "../pages/ManageItems";
import UpdateMenu from "../pages/UpdateMenu";
import Payment from "../pages/Payment";
import PaymentHistory from "../pages/PaymentHistory";



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
        element: <PrivateRoutes><Order /> </PrivateRoutes>,
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
  {
    path: "/dashboard",
    element: <PrivateRoutes><DashBoard /> </PrivateRoutes>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/carts",
        element: <Carts />,
      },
      {
        path: "/dashboard/payment",
        element: <Payment />,
      },
      {
        path: "/dashboard/paymentHistory",
        element: <PaymentHistory />,
      },

      // admin routes
      {
        path: "/dashboard/allUsers",
        element: <AdminRoutes> <AllUsers /> </AdminRoutes>,
      },
      {
        path: "/dashboard/addItems",
        element: <AdminRoutes> <AddItems /> </AdminRoutes>,
      },
      {
        path: "/dashboard/manageItems",
        element: <AdminRoutes> <ManageItems /> </AdminRoutes>,
      },
      {
        path: "/dashboard/updateItem/:id",
        element: <AdminRoutes> <UpdateMenu /> </AdminRoutes>,
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/menu/${params.id}`)
      },
    ]
  }
]);