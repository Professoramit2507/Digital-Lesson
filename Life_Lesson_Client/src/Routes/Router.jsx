import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import PublicLesson from "../Pages/Components/PublicLesson";
import UpdateLession from "../Pages/Components/UpdateLession";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Dashboard from "../Layout/Dashboard";
import AddLesson from "../Pages/Dashboard/AddLesson";
import MyLesson from "../Pages/Dashboard/MyLesson";
import Profile from "../Pages/Dashboard/Profile";
import MyFavorite from "../Pages/Dashboard/MyFavorite";
import DashboadHome from "../Pages/Dashboard/DashboadHome";
import Premimum from "../Pages/Components/Premimum";
import Price from "../Pages/Components/Price";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import ManageLesson from "../Pages/Dashboard/Admin/ManageLesson";
import ReportedLesson from "../Pages/Dashboard/Admin/ReportedLesson";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import AdminDashboardHome from "../Pages/Dashboard/Admin/AdminDashboardHome";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard";
import PaymentSucces from "../Pages/Dashboard/PaymentSucces";
import LessonDetails from "../Pages/Components/LessonDetails";
import PrivateRoute from "./PrivateRoute";

// Universal loader that retrieves lesson from DB first, then falls back to JSON
const fetchLessonById = async (id) => {
  // 1. Try to fetch from backend server (MongoDB _id)
  try {
    const apiRes = await fetch(`http://localhost:5000/lesson/${id}`);
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data && (data._id || data.title)) return data;
    }
  } catch (err) {
    console.warn("Backend lesson fetch failed, trying local JSON", err);
  }

  // 2. Try fetching from publicLesson.json
  try {
    const pubRes = await fetch("/publicLesson.json");
    if (pubRes.ok) {
      const pubData = await pubRes.json();
      const found = pubData.find((item) => item.id == id || item._id == id);
      if (found) return found;
    }
  } catch (e) {}

  // 3. Try fetching from premium.json
  try {
    const premRes = await fetch("/premium.json");
    if (premRes.ok) {
      const premData = await premRes.json();
      const found = premData.find((item) => item.id == id || item._id == id);
      if (found) return found;
    }
  } catch (e) {}

  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "add-lesson",
        element: (
          <PrivateRoute>
            <AddLesson></AddLesson>
          </PrivateRoute>
        ),
      },
      {
        path: "public-lesson",
        element: <PublicLesson></PublicLesson>,
        loader: () => fetch("/publicLesson.json").then((res) => res.json()),
      },
      {
        path: "/public-lesson/:id",
        element: <LessonDetails></LessonDetails>,
        loader: async ({ params }) => fetchLessonById(params.id),
      },
      {
        path: "premium-lesson",
        element: (
          <PrivateRoute>
            <Premimum></Premimum>
          </PrivateRoute>
        ),
        loader: () => fetch("/premium.json").then((res) => res.json()),
      },
      {
        path: "/premium-lesson/:id",
        element: <LessonDetails></LessonDetails>,
        loader: async ({ params }) => fetchLessonById(params.id),
      },
      {
        path: "/lesson-details/:id",
        element: <LessonDetails></LessonDetails>,
        loader: async ({ params }) => fetchLessonById(params.id),
      },
      {
        path: "update-lesson",
        element: <UpdateLession></UpdateLession>,
      },
      {
        path: "price",
        element: <Price></Price>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboadHome></DashboadHome>,
      },
      {
        path: "add-lesson",
        element: <AddLesson></AddLesson>,
      },
      {
        path: "my-lesson",
        element: <MyLesson></MyLesson>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "my-favorite",
        element: <MyFavorite></MyFavorite>,
      },
      {
        path: "payment-success",
        element: <PaymentSucces></PaymentSucces>,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <AdminRoute>
        <AdminDashboard></AdminDashboard>
      </AdminRoute>
    ),

    children: [
      {
        index: true,
        element: <AdminDashboardHome></AdminDashboardHome>,
      },
      {
        path: "manage-user",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "manage-lesson",
        element: <ManageLesson></ManageLesson>,
      },
      {
        path: "reported-lesson",
        element: <ReportedLesson></ReportedLesson>,
      },
      {
        path: "admin-profile",
        element: <AdminProfile></AdminProfile>,
      },
    ],
  },
]);
