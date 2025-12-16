import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  // If role is specified, check if user has it
  if (role && (!user.roles || !user.roles.includes(role))) {
    return <Navigate to="/login" replace />;
  }

  // Logged in (and role is fine if specified)
  return <Outlet />;
};

export default ProtectedRoute;
