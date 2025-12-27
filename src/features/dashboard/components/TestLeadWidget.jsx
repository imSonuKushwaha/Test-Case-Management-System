import SummaryCard from "./SummaryCard";

export default function TestLeadWidget({ stats }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">
        Team & Execution Overview
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Test Suites"
          value={stats.totalSuites}
          variant="neutral"
        />

        <SummaryCard
          title="Execution Progress"
          value={`${stats.executionProgress}%`}
          variant="info"
        />

        <SummaryCard
          title="Active Testers"
          value={stats.testersActive}
          variant="success"
        />
      </div>

      <div className="mt-5 flex gap-3">
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
          Manage Test Cases
        </button>

        <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition">
          View Reports
        </button>
      </div>
    </div>
  );
}
