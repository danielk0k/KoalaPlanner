import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Username from "./Username";
import Credential from "./Credential";
import SimpleSidebar from "../navbar-components/navbar";

function Settings() {
  return (
    <SimpleSidebar>
      <h1>Settings</h1>
      <h3>Update your account information</h3>
      <Link to="/app/profile">Profile | </Link>
      <Link to="/app/board">Board | </Link>
      <Link to="/app/settings">Settings</Link>
      <Avatar size={150} />
      <Username />
      <Credential />
    </SimpleSidebar>
  );
}

export default Settings;
