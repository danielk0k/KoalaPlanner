import { useState } from "react";
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
    <div className="form_container">
      <h2>Login Here</h2>
      <p>{
        loading ? "Logging In..."
        : (
        <div className="login_form_fields">
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
            id="email"
            className="inputField"
            type="email"
            placeholder="hello@example.com"
            onChange={(event) => setEmail(event.target.value)}
            />
            <button>Submit</button>
          </form>
        </div>
        )}
      </p>
      <button onClick={}>Register New User</button>
    </div>
)
}

export default LoginForm