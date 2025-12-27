import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { mockProjects } from "./mockProjects";

export default function ProjectList() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const canManage = user.role === "admin" || user.role === "test-lead";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Projects</h1>
          <p className="text-sm text-slate-500">
            Manage test projects and teams
          </p>
        </div>

        {canManage && (
          <button
            onClick={() => navigate("/projects/new")}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            + Create Project
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {mockProjects.map((project) => (
          <div key={project.id} className="rounded-xl border bg-white p-5">
            <h2 className="font-semibold text-slate-800">{project.name}</h2>

            <p className="text-sm text-slate-600 mt-1">{project.description}</p>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
              <span>Version: {project.version}</span>
              <span>Status: {project.status}</span>
              <span>Members: {project.members.length}</span>
            </div>

            <div className="mt-4 flex gap-3">
              {canManage && (
                <button
                  className="text-blue-600 text-sm hover:underline"
                  onClick={() => navigate(`/projects/${project.id}/edit`)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
