import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const mockExecutions = [
  {
    id: "TC-001",
    title: "Login with valid credentials",
    status: "Pending",
    priority: "High",
  },
  {
    id: "TC-002",
    title: "Role-based access control",
    status: "Failed",
    priority: "Critical",
  },
];

export default function ExecutionList() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Test Executions
        </h1>
        <p className="text-sm text-slate-500">
          Execute and track assigned test cases
        </p>
      </div>

      <div className="rounded-xl border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockExecutions.map((tc) => (
              <tr key={tc.id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{tc.id}</td>
                <td className="px-4 py-3">{tc.title}</td>
                <td className="px-4 py-3">{tc.priority}</td>
                <td className="px-4 py-3">{tc.status}</td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/executions/${tc.id}`)}
                  >
                    Execute
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
