import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const menuItems = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
    roles: ["admin", "test-lead", "tester", "read-only"],
  },
  {
    label: "Projects",
    path: "/app/projects",
    roles: ["admin", "test-lead"],
  },
  {
    label: "Test Cases",
    path: "/app/testcases",
    roles: ["admin", "test-lead", "read-only"],
  },
  {
    label: "Execution",
    path: "/app/executions",
    roles: ["admin", "test-lead", "tester"],
  },
];

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <aside className="w-60 bg-white border-r p-4">
      <h1 className="text-lg font-semibold text-slate-800 mb-6">
        Test Manager
      </h1>

      <nav className="space-y-2">
        {menuItems
          .filter((item) => item.roles.includes(user.role))
          .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
}
