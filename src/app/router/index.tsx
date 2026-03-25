import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../../features/auth/pages/LoginPage";
import ProtectedRoute from "../../features/auth/components/ProtectedRoute";
import AppLayout from "../../components/layout/AppLayout";
import DashboardPage from "../../pages/DashboardPage";
import UsersPage from "../../pages/UsersPage";
import OrdersPage from "../../pages/OrdersPage";
import ProductsPage from "../../pages/ProductsPage";
import AnalyticsPage from "../../pages/AnalyticsPage";
import SettingsPage from "../../pages/SettingsPage";
import NotFoundPage from "../../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/users",
            element: <UsersPage />,
          },
          {
            path: "/orders",
            element: <OrdersPage />,
          },
          {
            path: "/products",
            element: <ProductsPage />,
          },
          {
            path: "/analytics",
            element: <AnalyticsPage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);