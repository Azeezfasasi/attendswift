import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "../contextAPI/ProfileContext";

const PrivateRoute = () => {
  const { user, loading } = useProfile();

  if (loading) {
    return <div>Loading...</div>; // Or replace with a spinner
  }

  // Redirect to login if no user is authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Handle role-based redirection if needed
  if (user.role === "admin") {
    return <Outlet />;
  }

  if (user.role === "teacher") {
    return <Outlet />;
  }

  // Redirect to a generic page if role is unknown
  return <Navigate to="/" replace />;
};

export default PrivateRoute;

