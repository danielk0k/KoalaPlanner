import { useState, useEffect } from "react";
import supabaseClient from "./login-components/supabaseClient";
import LoginForm from "./login-components/LoginForm";
// import Account from "./login-components/Account";
import RegisterForm from "./login-components/RegisterForm";
import { Route, Routes } from "react-router-dom";

function App() {
  const [session , setSession] = useState(null);

  useEffect(() => {
    // Returns the session data, if there is an active session.
    setSession(supabaseClient.auth.session());
    
    // Listens to an auth event.
    supabaseClient.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);
  
  return (
    // <LoginForm supabaseClient={supabaseClient} />
    // <>
    //   {session ? <Account supabaseClient={supabaseClient} session={session} /> : <LoginForm supabaseClient={supabaseClient} />}
    // </>
    <div>
      <RegisterForm supabaseClient={supabaseClient} />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </div>
  )
}

export default App