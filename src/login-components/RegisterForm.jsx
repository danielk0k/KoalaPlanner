import { useState } from "react";
import RegisterForm from "./RegisterForm";

function RegisterForm({ supabaseClient }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signUp(
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
      <p>{
        loading ? "Creating new user..."
        : (
        <div className="login_form_fields">
          <form onSubmit={handleRegister}>
            <label htmlFor="text">Username:</label>
            <input
            id="username"
            className="inputField"
            type="text"
            onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="email">Email:</label>
            <input
            id="email"
            className="inputField"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
            id="password"
            className="inputField"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            />
            <button>Submit</button>
          </form>
        </div>
        )}
      </p>
      <button onClick={}>Sign In Current User</button>
    </div>
)
}

export default RegisterForm