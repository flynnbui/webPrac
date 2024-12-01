import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Blanko from "@/pages/Blanko";
import Slido from "@/pages/Slido";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/blanko",
        element: <Blanko />
    },
    {
        path: "/slido",
        element: <Slido />
    }
])