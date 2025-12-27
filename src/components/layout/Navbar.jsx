import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <span className="text-sm text-slate-600">
        Role: <span className="font-medium">{user.role}</span>
      </span>

      <button onClick={logout} className="text-sm text-red-600 hover:underline">
        Logout
      </button>
    </header>
  );
}
