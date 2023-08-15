import { useContext } from "react";
import mainState from "../Context/MainState";
import { Navigate } from "react-router-dom";

function LoginPrivateRoute({ children }) {
  const { isLoggedin } = useContext(mainState);
  if (isLoggedin) {
    // authorized so return child components
    return children;
  }
  // not logged in so redirect to login page with the return url
  return <Navigate to="/" />;
}
export { LoginPrivateRoute };
