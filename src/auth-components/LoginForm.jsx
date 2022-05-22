import supabaseClient from "./supabaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signIn({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      alert("Successfully logged in.");
      navigate("/app/profile", { replace: true });
    } catch (error) {
      alert("Error in logging in.");
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form_container">
      <h2>Login Here</h2>
      <div>
        {loading ? (
          "Logging In..."
        ) : (
          <div className="form_fields">
            <form onSubmit={handleLogin}>
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
      <Link to="/app/signup">Register new user</Link>
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

export default LoginForm;
