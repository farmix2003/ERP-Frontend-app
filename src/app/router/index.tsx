import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../../features/auth/components/ProtectedRoute";
import AppLayout from "../../components/layout/AppLayout";
import React, { lazy, Suspense } from "react";
import PageLoader from "../../components/shared/PageLoader";


const LoginPage =  lazy(() => import("../../features/auth/pages/LoginPage"));
const DashboardPage =  lazy(() => import("../../pages/DashboardPage"));
const UsersPage =  lazy(() => import("../../pages/UsersPage"));
const OrdersPage =  lazy(() => import("../../pages/OrdersPage"));
const ProductsPage =  lazy(() => import("../../pages/ProductsPage"));
const AnalyticsPage =  lazy(() => import("../../pages/AnalyticsPage"));
const SettingsPage =  lazy(() => import("../../pages/SettingsPage"));
const NotFoundPage =  lazy(() => import("../../pages/NotFoundPage"));

const withSuspense = (component: React.ReactNode) =>(
  <Suspense fallback={<PageLoader />}>{component}</Suspense>
)


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: withSuspense(<LoginPage />),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/dashboard",
            element: withSuspense(<DashboardPage />),
          },
          {
            path: "/users",
            element: withSuspense(<UsersPage />),
          },
          {
            path: "/orders",
            element: withSuspense(<OrdersPage />),
          },
          {
            path: "/products",
            element: withSuspense(<ProductsPage />),
          },
          {
            path: "/analytics",
            element: withSuspense(<AnalyticsPage />),
          },
          {
            path: "/settings",
            element: withSuspense(<SettingsPage />),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: withSuspense(<NotFoundPage />),
  },
]);