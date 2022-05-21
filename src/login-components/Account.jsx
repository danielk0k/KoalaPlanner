import supabaseClient from "./supabaseClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const session = supabaseClient.auth.session();
  const user = supabaseClient.auth.user();
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabaseClient
        .from("profiles")
        .select(`username`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setNewUsername(data.username);
      }
    } catch (error) {
      alert(error.message);
      supabaseClient.auth.signOut();
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username: newUsername,
        updated_at: new Date(),
      };

      const { upsertError } = await supabaseClient.from("profiles").upsert(
        updates,
        { returning: "minimal" } // Don't return the value after inserting
      );

      setUsername(newUsername);

      if (upsertError) {
        throw upsertError;
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
      <h3>Welcome back {username}</h3>
      <div>
        {loading ? (
          "Updating profile..."
        ) : (
          <form onSubmit={updateProfile}>
            <label htmlFor="text">New Username:</label>
            <input
              id="username"
              className="inputField"
              type="text"
              onChange={(event) => setNewUsername(event.target.value)}
            />
            <button>Submit</button>
          </form>
        )}
      </div>
      <button
        type="button"
        className="button block"
        onClick={() => {
          supabaseClient.auth.signOut();
          navigate("/", { replace: true });
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Account;
