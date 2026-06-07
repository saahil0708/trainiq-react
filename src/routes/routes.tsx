import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Courses from "../pages/Courses";
import Placeholder from "../pages/Placeholder";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "courses",
                element: <Courses />,
            },
            {
                path: "schedule",
                element: <Placeholder title="Schedule" />,
            },
            {
                path: "profile",
                element: <Placeholder title="Profile" />,
            },
            {
                path: "settings",
                element: <Placeholder title="Settings" />,
            },
        ],
    },
]);