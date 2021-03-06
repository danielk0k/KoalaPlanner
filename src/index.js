import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import WelcomePage from "./welcome-pg-components/WelcomePage";
import App from "./App";
import RegisterForm from "./auth-components/RegisterForm";
import LoginForm from "./auth-components/LoginForm";
import PasswordResetForm from "./auth-components/PasswordResetForm";
import Dashboard from "./profile-components/Dashboard";
import Board from "./kanban-components/index";
import Settings from "./settings-components/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/app" element={<App signout={false} />}></Route>
        <Route path="/app/signup" element={<RegisterForm />}></Route>
        <Route path="/app/login" element={<LoginForm />}></Route>
        <Route path="/app/profile" element={<Dashboard />}></Route>
        <Route path="/app/board" element={<Board />}></Route>
        <Route path="/app/settings" element={<Settings />}></Route>
        <Route path="/app/signout" element={<App signout={true} />}></Route>
        <Route path="/recovery" element={<PasswordResetForm />}></Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
