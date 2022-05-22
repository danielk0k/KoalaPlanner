import { Navigate } from "react-router-dom";
import supabaseClient from "./auth-components/supabaseClient";

function App() {
  // Returns the session data, if there is an active session.
  const session = supabaseClient.auth.session();

  return session ? (
    // Already logged in.
    <Navigate to="/app/profile" replace={true} />
  ) : (
    // Not logged in.
    <Navigate to="/app/login" replace={true} />
  );
}

export default App;
