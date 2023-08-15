import { useContext } from "react";
import mainState from "../Context/MainState";
import { Navigate } from "react-router-dom";

function DashboardPrivateRoute({ children }) {
  const { isLoggedin } = useContext(mainState);
  if (!isLoggedin) {
    // authorized so return child components
    return children;
  }
  // not logged in so redirect to Dashboard page with the return url
  return <Navigate to="/Dashboard" />;
}
export { DashboardPrivateRoute };
