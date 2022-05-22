import React from "react";
import { Link } from "react-router-dom";

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <Link to="/app/profile">Profile | </Link>
      <Link to="/app/board">Board | </Link>
      <Link to="/app/settings">Settings</Link>
    </div>
  );
}

export default Settings;
