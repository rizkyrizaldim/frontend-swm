import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailPage from './components/DetailPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import DeviceStatus from './components/DeviceStatus.jsx';
import ReportPage from './components/ReportPage.jsx';
import MapsPage from './components/MapsPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/devices",
    element: <DeviceStatus />
  },
  {
    path: "/reports",
    element: <ReportPage />
  },
  {
    path: "/maps",
    element: <MapsPage />
  },
  {
    path: "/detail",
    element: <DetailPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

