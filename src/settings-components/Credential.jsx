import React from "react";
import { useState } from "react";
import supabaseClient from "../auth-components/supabaseClient";

function Credential() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateCredential = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabaseClient.auth.update({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert("Error in updating credential.");
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={updateCredential}>
      <label htmlFor="text">Email:</label>
      <input
        id="email"
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <br></br>
      <label htmlFor="text">Password:</label>
      <input
        id="password"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button>Save</button>
    </form>
  );
}

export default Credential;
