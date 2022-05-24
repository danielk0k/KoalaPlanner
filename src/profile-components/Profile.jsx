import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabaseClient from "../auth-components/supabaseClient";

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
    <div>
      <h1>Profile</h1>
      <h3>View your achievements and statistics</h3>
      <h3>Welcome back {username}</h3>
      <Link to="/app/profile">Profile | </Link>
      <Link to="/app/board">Board | </Link>
      <Link to="/app/settings">Settings</Link>

      <br></br>
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
    </div>
  );
}

export default Profile;
