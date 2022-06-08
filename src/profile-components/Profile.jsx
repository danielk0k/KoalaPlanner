import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabaseClient from "../auth-components/supabaseClient";
import SimpleSidebar from "../navbar-components/navbar";

function Profile() {
  const [username, setUsername] = useState("");
  const session = supabaseClient.auth.session();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
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
      supabaseClient.auth.signOut();
      navigate("/app", { replace: true });
    }
  };

  return (
    <SimpleSidebar>
      <h1>Profile</h1>
      <h3>View your achievements and statistics</h3>
      <h3>Welcome back {username}</h3>
      <button
        type="button"
        className="button block"
        onClick={() => {
          supabaseClient.auth.signOut();
          navigate("/app", { replace: true });
        }}
      >
        Sign Out
      </button>
    </SimpleSidebar>
  );
}

export default Profile;
