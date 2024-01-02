import Tasks from "pages/Tasks";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AuthWrapper from "wrappers/AuthWrapper";

const Login = lazy(() => import("pages/Login"));
const SignUp = lazy(() => import("pages/SignUp"));
const Dashboard = lazy(() => import("pages/Dashboard"));

export default function AppWrapper() {
  return (
    <div className="root-wrapper">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<AuthWrapper />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </div>
  );
}
