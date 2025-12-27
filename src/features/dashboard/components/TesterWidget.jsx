import SummaryCard from "./SummaryCard";

export default function TesterWidget({ stats }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">My Testing Work</h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Assigned"
          value={stats.assigned}
          variant="neutral"
        />

        <SummaryCard
          title="Completed"
          value={stats.completed}
          variant="success"
        />

        <SummaryCard title="Failed" value={stats.failed} variant="danger" />
      </div>

      <div className="mt-5">
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
          Go to Test Execution
        </button>
      </div>
    </div>
  );
}
