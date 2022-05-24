import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabaseClient from "../auth-components/supabaseClient";
import Avatar from "./Avatar";

function Settings() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const navigate = useNavigate();
  const user = supabaseClient.auth.user();
  const session = supabaseClient.auth.session();

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      let { data, error, status } = await supabaseClient
        .from("profiles")
        .select(`username, avatar_url`)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setEmail(user.email);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
      supabaseClient.auth.signOut();
      navigate("/app", { replace: true });
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      const { error: upsertError } = await supabaseClient
        .from("profiles")
        .upsert(
          updates,
          { returning: "minimal" } // Don't return the value after inserting
        );

      const { error: updateError } = await supabaseClient.auth.update({
        email,
        password,
      });

      if (upsertError || updateError) {
        throw upsertError || updateError;
      }
    } catch (error) {
      alert("Error in updating profile.");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <h3>Update your account information</h3>
      <Link to="/app/profile">Profile | </Link>
      <Link to="/app/board">Board | </Link>
      <Link to="/app/settings">Settings</Link>
      {loading ? (
        "Updating profile..."
      ) : (
        <form onSubmit={updateProfile}>
          <Avatar
            url={avatarUrl}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
            }}
          />
          <label htmlFor="text">Username:</label>
          <input
            id="username"
            className="inputField"
            type="text"
            placeholder={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <br></br>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            className="inputField"
            type="email"
            placeholder={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <br></br>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            className="inputField"
            type="password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
          <br></br>
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}

export default Settings;
