import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./welcome-pg-components/WelcomePage";
import App from "./App";
import RegisterForm from "./auth-components/RegisterForm";
import LoginForm from "./auth-components/LoginForm";
import Profile from "./profile-components/Profile";
import KanbanBoard from "./kanban-components/KanbanBoard";
import Settings from "./settings-components/Settings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/app" element={<App />}></Route>
        <Route path="/app/signup" element={<RegisterForm />}></Route>
        <Route path="/app/login" element={<LoginForm />}></Route>
        <Route path="/app/profile" element={<Profile />}></Route>
        <Route path="/app/board" element={<KanbanBoard />}></Route>
        <Route path="/app/settings" element={<Settings />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
