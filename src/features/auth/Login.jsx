import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { mockUsers } from "./mockUsers";
import { generateFakeToken } from "../../utils/helpers";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (!user) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      const token = generateFakeToken(user);

      login({
        id: user.id,
        role: user.role,
        token,
      });

      navigate("/app/dashboard");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-slate-800 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1">
          Sign in to your Test Management System
        </p>

        {error && (
          <div className="mt-4 rounded-md bg-red-50 text-red-600 text-sm px-4 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-2 rounded-lg bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600">
          <p className="font-medium mb-2 text-slate-700">Demo Accounts</p>
          <p>Admin: admin@test.com / admin123</p>
          <p>Lead: lead@test.com / lead123</p>
          <p>Tester: tester@test.com / tester123</p>
          <p>Viewer: viewer@test.com / viewer123</p>
        </div>
      </div>
    </div>
  );
}
