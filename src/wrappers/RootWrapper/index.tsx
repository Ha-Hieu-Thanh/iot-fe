import Alert from "pages/Alert";
import Subcription from "pages/Subcription";
import Location from "pages/Location";
import Tasks from "pages/Tasks";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AuthWrapper from "wrappers/AuthWrapper";

const Login = lazy(() => import("pages/Login"));
const SignUp = lazy(() => import("pages/SignUp"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const Chart = lazy(() => import("pages/Chart"));

export default function AppWrapper() {
  return (
    <div className="root-wrapper">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<AuthWrapper />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/chart" element={<Chart />} />

          <Route path="/subcription" element={<Subcription />} />
          <Route path="/settings/alert" element={<Alert />} />
          <Route path="/settings/location" element={<Location />} />
        </Route>
      </Routes>
    </div>
  );
}
