import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { mockUsers } from "./mockUsers";
import { useEffect } from "react";
import { getProjectById } from "./mockProjectService";

export default function ProjectForm() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  if (user.role !== "admin" && user.role !== "test-lead") {
    return (
      <div className="text-red-600">
        You do not have permission to manage projects.
      </div>
    );
  }

  const [form, setForm] = useState({
    name: "",
    description: "",
    version: "",
    status: "Active",
    members: [],
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project submitted:", form);
    navigate("/projects");
  };

  const toggleMember = (user) => {
    setForm((prev) => {
      const exists = prev.members.find((m) => m.id === user.id);

      return {
        ...prev,
        members: exists
          ? prev.members.filter((m) => m.id !== user.id)
          : [...prev.members, user],
      };
    });
  };

  const isMemberSelected = (userId) =>
    form.members.some((m) => m.id === userId);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    setTimeout(() => {
      const project = getProjectById(id);

      if (!project) {
        alert("Project not found");
        navigate("/projects");
        return;
      }

      setForm({
        name: project.name || "",
        description: project.description || "",
        version: project.version || "",
        status: project.status || "Active",
        members: project.members || [],
      });

      setLoading(false);
    }, 400);
  }, [id, navigate]);

  if (loading) {
    return <div className="text-slate-500">Loading project details...</div>;
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">
        {id ? "Edit Project" : "Create Project"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border bg-white p-6 space-y-4"
      >
        <div>
          <label className="block text-sm mb-1">Project Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm mb-1">Version</label>
            <input
              name="version"
              value={form.version}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option>Active</option>
              <option>In Progress</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        {/* Assign Members */}
        <div>
          <h2 className="text-sm font-medium text-slate-800 mb-2">
            Assign Team Members
          </h2>

          <div className="rounded-lg border bg-slate-50 p-4 space-y-2">
            {mockUsers.map((user) => (
              <label key={user.id} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={isMemberSelected(user.id)}
                  onChange={() => toggleMember(user)}
                />

                <span className="text-slate-700">{user.name}</span>

                <span className="text-xs text-slate-500">({user.role})</span>
              </label>
            ))}

            {form.members.length === 0 && (
              <p className="text-xs text-slate-500">No members assigned</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            {id ? "Update Project" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
