import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TaskList from "./pages/TaskList";
import SingleTask from "./pages/SingleTask";

export const Router = () => {
  return (
    <div className="router">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/:taskId" element={<SingleTask />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};
