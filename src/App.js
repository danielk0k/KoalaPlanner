import { Navigate } from "react-router-dom";
import supabaseClient from "./login-components/supabaseClient";

function App() {
  // Returns the session data, if there is an active session.
  const session = supabaseClient.auth.session();

  return session ? (
    // Already logged in.
    <Navigate to="/home" replace={true} />
  ) : (
    // Not logged in.
    <Navigate to="login" replace={true} />
  );
}

export default App;
