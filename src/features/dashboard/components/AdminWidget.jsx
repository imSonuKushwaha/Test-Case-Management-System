import SummaryCard from "./SummaryCard";

export default function AdminWidget({ stats }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">System Overview</h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Projects"
          value={stats.totalProjects}
          variant="neutral"
        />

        <SummaryCard title="Users" value={stats.totalUsers} variant="info" />

        <SummaryCard
          title="Open Defects"
          value={stats.openDefects}
          variant="danger"
        />
      </div>

      <div className="mt-5 flex gap-3">
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
          Manage Projects
        </button>

        <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition">
          Manage Users
        </button>
      </div>
    </div>
  );
}
