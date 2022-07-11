import { Navigate } from "react-router-dom";

function HandleRedirect() {
  const urlString = window.location.href;
  const paramString = urlString.split("#");
  const queryString = new URLSearchParams(paramString[1]);
  if (queryString.has("type") && queryString.get("type") === "recovery") {
    return (
      <Navigate
        to={`/recovery/${queryString.get("access_token")}`}
        replace={true}
      />
    );
  } else {
    return <Navigate to="/" replace={true} />;
  }
}

export default HandleRedirect;
