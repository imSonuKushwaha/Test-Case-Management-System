import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { mockTestCaseDetails } from "./mockTestCaseDetails";
import SummaryCard from "../dashboard/components/SummaryCard";

export default function TestCaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const testCase = mockTestCaseDetails; // later fetch by id

  const canEdit = user.role === "admin" || user.role === "test-lead";

  const canExecute =
    user.role === "admin" ||
    user.role === "test-lead" ||
    user.role === "tester";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            {testCase.title}
          </h1>
          <p className="text-sm text-slate-500">
            {testCase.id} · Suite: {testCase.suite}
          </p>
        </div>

        <div className="flex gap-2">
          {canEdit && (
            <button className="rounded-lg border px-3 py-1 text-sm">
              Edit
            </button>
          )}

          {canExecute && (
            <button
              className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white"
              onClick={() => navigate(`/executions/${testCase.id}`)}
            >
              Execute
            </button>
          )}
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Priority"
          value={testCase.priority}
          variant={
            testCase.priority === "High"
              ? "danger"
              : testCase.priority === "Medium"
              ? "warning"
              : "neutral"
          }
        />
        <SummaryCard title="Type" value={testCase.type} variant="info" />
        <SummaryCard
          title="Last Updated"
          value={testCase.lastUpdated}
          variant="neutral"
        />
      </div>

      {/* Description */}
      <div className="rounded-xl border bg-white p-6">
        <h2 className="font-medium text-slate-800 mb-2">Description</h2>
        <p className="text-sm text-slate-600">{testCase.description}</p>
      </div>

      {/* Preconditions */}
      <div className="rounded-xl border bg-white p-6">
        <h2 className="font-medium text-slate-800 mb-2">Preconditions</h2>
        <p className="text-sm text-slate-600">{testCase.preconditions}</p>
      </div>

      {/* Test Steps */}
      <div className="rounded-xl border bg-white p-6">
        <h2 className="font-medium text-slate-800 mb-4">Test Steps</h2>

        <div className="space-y-3">
          {testCase.steps.map((step) => (
            <div key={step.step} className="rounded-lg border bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">
                Step {step.step}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                <strong>Action:</strong> {step.action}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Expected:</strong> {step.expected}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-slate-500">
        Last updated by {testCase.updatedBy}
      </div>
    </div>
  );
}
