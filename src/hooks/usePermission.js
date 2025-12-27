import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const usePermission = (allowedRoles) => {
  const { user } = useContext(AuthContext);
  return user && allowedRoles.includes(user.role);
};
