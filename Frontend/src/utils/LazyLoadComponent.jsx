import React, { lazy } from "react";
export const Navbar = lazy(() => import("../components/Navbar"));
export const Login = lazy(() => import("../pages/Login"));
export const Home = lazy(() => import("../pages/Home"));
export const ProtectedRoute = lazy(() => import("../context/ProtectedRoutes"));
export const Layout = lazy(() => import("../layout/Layout"));
