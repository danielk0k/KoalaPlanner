import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
import LoginForm from "./login-components/LoginForm";
import RegisterForm from "./login-components/RegisterForm";
import Account from "./login-components/Account";
import WelcomePage from "./welcome-pg-components/WelcomePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/home" element={<Account />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
