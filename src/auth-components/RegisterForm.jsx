import supabaseClient from "./supabaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { user, error: signUpError } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      }

      const { error: upsertError } = await supabaseClient
        .from("profiles")
        .upsert(
          { id: user.id, username: name, updated_at: new Date() },
          { returning: "minimal" } // Don't return the value after inserting
        );

      if (upsertError) {
        throw upsertError;
      }

      alert("Successfully created new user.");
      navigate("/app/profile", { replace: true });
    } catch (error) {
      alert("Error in creating new user.");
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form_container">
      <h2>Sign Up Here</h2>
      <div>
        {loading ? (
          "Creating new user..."
        ) : (
          <div className="form_fields">
            <form onSubmit={handleRegister}>
              <label htmlFor="text">Username:</label>
              <input
                id="username"
                className="inputField"
                type="text"
                onChange={(event) => setName(event.target.value)}
              />
              <br></br>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                className="inputField"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <br></br>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                className="inputField"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <br></br>
              <button>Submit</button>
            </form>
          </div>
        )}
      </div>
      <Link to="/app/login">Sign in as current user</Link>
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

export default RegisterForm;
