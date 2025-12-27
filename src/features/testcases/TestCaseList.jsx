import { useState, useMemo, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { mockTestCases } from "./mockTestCases";
import { useNavigate } from "react-router-dom";

export default function TestCaseList() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");
  const [type, setType] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredTestCases = useMemo(() => {
    return mockTestCases.filter((tc) => {
      const matchesSearch =
        tc.title.toLowerCase().includes(search.toLowerCase()) ||
        tc.id.toLowerCase().includes(search.toLowerCase());

      const matchesPriority = priority === "all" || tc.priority === priority;

      const matchesType = type === "all" || tc.type === type;

      return matchesSearch && matchesPriority && matchesType;
    });
  }, [search, priority, type]);

  const canManage = user.role === "admin" || user.role === "test-lead";

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(filteredTestCases.map((tc) => tc.id));
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const isAllSelected =
    filteredTestCases.length > 0 &&
    selectedIds.length === filteredTestCases.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Test Cases</h1>
        <p className="text-sm text-slate-500">Manage and execute test cases</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by ID or title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="all">All Priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="all">All Types</option>
          <option value="Functional">Functional</option>
          <option value="Performance">Performance</option>
          <option value="Security">Security</option>
        </select>

        {canManage && (
          <button
            className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            onClick={() => navigate("/testcases/new")}
          >
            + Create Test Case
          </button>
        )}
      </div>

      {canManage && selectedIds.length > 0 && (
        <div className="flex items-center justify-between rounded-lg border bg-slate-50 px-4 py-2">
          <span className="text-sm text-slate-600">
            {selectedIds.length} selected
          </span>

          <div className="flex gap-2">
            <button
              className="rounded border border-red-300 bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100"
              onClick={() => {
                alert(`Deleting: ${selectedIds.join(", ")}`);
                clearSelection();
              }}
            >
              Delete
            </button>

            <button
              className="rounded border border-blue-300 bg-blue-50 px-3 py-1 text-sm text-blue-600 hover:bg-blue-100"
              onClick={() => {
                alert(`Updating priority for: ${selectedIds.join(", ")}`);
                clearSelection();
              }}
            >
              Update Priority
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) =>
                    e.target.checked ? selectAll() : clearSelection()
                  }
                />
              </th>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Priority</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Suite</th>
              <th className="px-4 py-3 text-left">Updated</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTestCases.map((tc) => (
              <tr
                key={tc.id}
                className={`border-t hover:bg-slate-50 ${
                  selectedIds.includes(tc.id) ? "bg-blue-50" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(tc.id)}
                    onChange={() => toggleSelect(tc.id)}
                  />
                </td>
                <td className="px-4 py-3 font-medium">{tc.id}</td>
                <td className="px-4 py-3">{tc.title}</td>
                <td className="px-4 py-3">{tc.priority}</td>
                <td className="px-4 py-3">{tc.type}</td>
                <td className="px-4 py-3">{tc.suite}</td>
                <td className="px-4 py-3">{tc.lastUpdated}</td>
                <td className="px-4 py-3">
                  <button
                    className="text-blue-600 hover:underline mr-3"
                    onClick={() => navigate(`/testcases/${tc.id}`)}
                  >
                    View
                  </button>

                  {canManage && (
                    <button
                      className="text-slate-600 hover:underline"
                      onClick={() => navigate(`/testcases/${tc.id}/edit`)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredTestCases.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No test cases found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (UI only) */}
      <div className="flex justify-end gap-2 text-sm">
        <button className="rounded border px-3 py-1">Previous</button>
        <button className="rounded border px-3 py-1">Next</button>
      </div>
    </div>
  );
}
