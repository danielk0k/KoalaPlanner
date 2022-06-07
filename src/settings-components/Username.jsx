import React from "react";
import { useState, useEffect } from "react";
import supabaseClient from "../auth-components/supabaseClient";

function Username() {
  const [username, setUsername] = useState("");
  const user = supabaseClient.auth.user();
  const session = supabaseClient.auth.session();

  useEffect(() => {
    getUsername();
  }, [session]);

  const getUsername = async () => {
    try {
      let { data, error, status } = await supabaseClient
        .from("profiles")
        .select(`username`)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const updateUsername = async (e) => {
    e.preventDefault();

    try {
      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      };

      const { error } = await supabaseClient
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert("Error in updating profile.");
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={updateUsername}>
      <label htmlFor="text">Username:</label>
      <input
        id="username"
        type="text"
        placeholder={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button>Save</button>
    </form>
  );
}

export default Username;
