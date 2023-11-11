import "./assets/scss/style.scss";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard/Dashboard";
import Chat from "./views/Dashboard/Chat";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import ChatState from "./context/ChatState";
// import { SocketContextProvider } from "./context/socket.context";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "chat/:chatId",
        element: <Chat />,
      },
    ],
  },
  {
    path: "*",
    element: <p>Sorry page not found</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
