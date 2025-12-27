import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div className="p-6 text-red-500">Access Denied</div>;
  }

  return children;
}
