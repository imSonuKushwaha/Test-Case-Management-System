import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { mockTestCaseDetails } from "../testcases/mockTestCaseDetails";
import { mockExecutionHistory } from "./mockExecutionData";

const STATUS_OPTIONS = ["Passed", "Failed", "Blocked", "Skipped"];

export default function TestExecution() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const canExecute =
    user.role === "admin" ||
    user.role === "test-lead" ||
    user.role === "tester";

  if (!canExecute) {
    return (
      <div className="text-red-600">
        You do not have permission to execute tests.
      </div>
    );
  }

  const [status, setStatus] = useState("Passed");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log({
      testCaseId: id,
      status,
      comment,
      executedBy: user.role,
    });

    alert("Execution saved (mock)");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Execute Test Case
        </h1>
        <p className="text-sm text-slate-500">
          {mockTestCaseDetails.id} · {mockTestCaseDetails.title}
        </p>
      </div>

      {/* Test Case Summary */}
      <div className="rounded-xl border bg-white p-6">
        <h2 className="font-medium text-slate-800 mb-2">Test Case Details</h2>
        <p className="text-sm text-slate-600">
          {mockTestCaseDetails.description}
        </p>
      </div>

      {/* Execution Form */}
      <div className="rounded-xl border bg-white p-6 space-y-4">
        <h2 className="font-medium text-slate-800">Execution Result</h2>

        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border px-3 py-2"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Comments</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="3"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Add execution notes..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Save Execution
        </button>
      </div>

      {/* Execution History */}
      <div className="rounded-xl border bg-white p-6">
        <h2 className="font-medium text-slate-800 mb-3">Execution History</h2>

        <div className="space-y-3">
          {mockExecutionHistory.map((run) => (
            <div key={run.id} className="rounded-lg border bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">{run.status}</p>
              <p className="text-sm text-slate-600">{run.comment}</p>
              <p className="text-xs text-slate-500 mt-1">
                {run.executedBy} · {run.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
