import { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";

function RegisterForm({ supabaseClient }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { user, session, error } = await supabaseClient.auth.signUp(
        { email, password },
        { data: { username: name } }
      );

      if (error) {
        throw error;
      }
      alert("Successfully created new user.");
    } catch (error) {
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
          <div className="login_form_fields">
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
      <Link to="/login">Sign in as current user</Link>
      <button
        type="button"
        className="button block"
        onClick={() => supabaseClient.auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}

export default RegisterForm;
