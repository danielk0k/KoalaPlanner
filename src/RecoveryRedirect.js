import { Navigate } from "react-router-dom";

function RecoveryRedirect() {
  const urlString = window.location.href;
  const paramString = urlString.split("#");
  const queryString = new URLSearchParams(paramString[1]);
  if (queryString.has("type") && queryString.get("type") === "recovery") {
    return (
      <Navigate
        to="/recovery"
        replace={true}
        state={{ token: queryString.get("access_token") }}
      />
    );
  } else {
    return <Navigate to="/" replace={true} />;
  }
}

export default RecoveryRedirect;
