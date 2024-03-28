import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Supplies from "../pages/supplies/supplies";
import Login from "../pages/Auth/Login/login";
import Register from "../pages/Auth/Register/register";
import Dashboard from "@/pages/dashboard/Dashboard";
import Createsupply from "@/components/dashboard/createsupply";
import AllSupply from "@/components/dashboard/allSupplies";
import ProtectedRoutes from "@/utils/protectedRoutes";
import NotFound from "@/pages/notfound";
import Detail from "@/pages/supplies/detail";
import AboutUs from "@/pages/aboutUs/aboutUs";
import LearderboardPage from "@/pages/leaderboard/learderboard";
import CommunityPage from "@/pages/community/community";
import VolunteerPage from "@/pages/volunteer/volunteer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/supplies",
        element: <Supplies />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/leaderboard",
        element: <LearderboardPage />,
      },
      {
        path: "/community",
        element: <CommunityPage />,
      },
      {
        path: "/volunteer",
        element: <VolunteerPage />,
      },
      {
        path: "/supply/:id",
        element: <Detail />,
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

    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/dashboard/create-supply",
        element: <Createsupply />,
      },
      {
        path: "/dashboard/all-supply",
        element: <AllSupply />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
