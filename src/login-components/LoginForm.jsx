import { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

function LoginForm({ supabaseClient }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { user, session, error } = await supabaseClient.auth.signIn({ email, password });

      if (error) {
        throw error;
      }
      alert("Successfully logged in.");
    } catch (error) {
      console.log(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <div className="form_container">
        <h2>Login Here</h2>
        <div>{
          loading ? "Logging In..."
          : (
          <div className="login_form_fields">
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
        <Link to="/register">Register new user</Link>
      </div>
      <button type="button" className="button block" onClick={() => supabaseClient.auth.signOut()}>
        Sign Out
      </button>
    </BrowserRouter>
)
}

export default LoginForm