import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { getTestCaseById } from "./mockTestCaseService";

const emptyStep = { action: "", expected: "" };

export default function TestCaseForm() {
  // Get id from params to determine if it's edit or create
  const { id } = useParams();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  if (user.role === "tester" || user.role === "read-only") {
    return (
      <div className="text-red-600">
        You do not have permission to access this page.
      </div>
    );
  }

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    type: "Functional",
    suite: "",
    preconditions: "",
    steps: [{ ...emptyStep }],
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...form.steps];
    updatedSteps[index][field] = value;
    setForm((prev) => ({ ...prev, steps: updatedSteps }));
  };

  const addStep = () => {
    setForm((prev) => ({
      ...prev,
      steps: [...prev.steps, { ...emptyStep }],
    }));
  };

  const removeStep = (index) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting test case:", form);
    navigate("/testcases");
  };

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const data = getTestCaseById(id);

      if (!data) {
        alert("Test case not found");
        navigate("/testcases");
        return;
      }

      setForm({
        title: data.title || "",
        description: data.description || "",
        priority: data.priority || "Medium",
        type: data.type || "Functional",
        suite: data.suite || "",
        preconditions: data.preconditions || "",
        steps:
          data.steps && data.steps.length > 0
            ? data.steps
            : [{ action: "", expected: "" }],
      });

      setLoading(false);
    }, 500);
  }, [id, navigate]);

  if (loading) {
    return <div className="text-slate-500">Loading test case...</div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">
        {id ? "Edit Test Case" : "Create Test Case"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border bg-white p-6"
      >
        {/* Basic Info */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Suite</label>
            <input
              name="suite"
              value={form.suite}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option>Functional</option>
              <option>Regression</option>
              <option>Integration</option>
              <option>Smoke</option>
              <option>UI</option>
              <option>API</option>
            </select>
          </div>
        </div>

        {/* Description */}
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

        {/* Preconditions */}
        <div>
          <label className="block text-sm mb-1">Preconditions</label>
          <textarea
            name="preconditions"
            value={form.preconditions}
            onChange={handleChange}
            rows="2"
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        {/* Test Steps */}
        <div>
          <h2 className="font-medium text-slate-800 mb-2">Test Steps</h2>

          <div className="space-y-3">
            {form.steps.map((step, index) => (
              <div key={index} className="rounded-lg border bg-slate-50 p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs mb-1">Action</label>
                    <textarea
                      value={step.action}
                      onChange={(e) =>
                        handleStepChange(index, "action", e.target.value)
                      }
                      rows="2"
                      className="w-full rounded border px-2 py-1"
                    />
                  </div>

                  <div>
                    <label className="block text-xs mb-1">
                      Expected Result
                    </label>
                    <textarea
                      value={step.expected}
                      onChange={(e) =>
                        handleStepChange(index, "expected", e.target.value)
                      }
                      rows="2"
                      className="w-full rounded border px-2 py-1"
                    />
                  </div>
                </div>

                {form.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="mt-2 text-xs text-red-600 hover:underline"
                  >
                    Remove Step
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addStep}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            + Add Step
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/testcases")}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            {id ? "Update Test Case" : "Create Test Case"}
          </button>
        </div>
      </form>
    </div>
  );
}
