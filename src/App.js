import { useState, useEffect } from "react";
import supabaseClient from "./login-components/supabaseClient";
import LoginForm from "./login-components/LoginForm";
import Account from "./login-components/Account";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Returns the session data, if there is an active session.
    setSession(supabaseClient.auth.session());

    // Listens to an auth event.
    supabaseClient.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {session ? (
        <Account supabaseClient={supabaseClient} session={session} />
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export default App;
