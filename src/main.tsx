import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GetOtp from "./components/GetOtp";
import ValidateEmail from "./components/ValidateEmail";
import BasicCalendar from "./components/BasicCalendar";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    element: <GetOtp />,
  },
  {
    path: "/get-otp",
    element: <GetOtp />,
  },
  {
    path: "/validate-email",
    element: <ValidateEmail />,
  },
  {
    path: "/calendar",
    element: <BasicCalendar />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
