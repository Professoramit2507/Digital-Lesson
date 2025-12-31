import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";


const AdminRoute = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
