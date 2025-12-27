import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SummaryCard from "./components/SummaryCard";
import TesterWidget from "./components/TesterWidget";
import { dashboardSummary, testerStats } from "./mockDashboardData";
import TestLeadWidget from "./components/TestLeadWidget";
import { leadStats } from "./mockDashboardData";
import AdminWidget from "./components/AdminWidget";
import { adminStats } from "./mockDashboardData";
import TestStatusPie from "./charts/TestStatusPie";
import ExecutionTrendLine from "./charts/ExecutionTrendLine";
import PriorityBar from "./charts/PriorityBar";
import {
  statusDistributionData,
  executionTrendData,
  priorityData,
} from "./mockChartData";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const isTester = user.role === "tester";
  const isTestLead = user.role === "test-lead";
  const isAdmin = user.role === "admin";

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back, role: <span className="font-medium">{user.role}</span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryCard
          title="Total Test Cases"
          value={dashboardSummary.totalTestCases}
          variant="neutral"
        />
        <SummaryCard
          title="Passed"
          value={dashboardSummary.passed}
          variant="success"
        />
        <SummaryCard
          title="Failed"
          value={dashboardSummary.failed}
          variant="danger"
        />
        <SummaryCard
          title="Blocked"
          value={dashboardSummary.blocked}
          variant="warning"
        />
        <SummaryCard
          title="Pending"
          value={dashboardSummary.pending}
          variant="info"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="min-w-0">
          <TestStatusPie data={statusDistributionData} />
        </div>
        <div className="min-w-0">
          <ExecutionTrendLine data={executionTrendData} />
        </div>
        <div className="min-w-0">
          <PriorityBar data={priorityData} />
        </div>
      </div>

      {/* Role-based sections */}
      {isTester && <TesterWidget stats={testerStats} />}
      {isTestLead && <TestLeadWidget stats={leadStats} />}
      {isAdmin && <AdminWidget stats={adminStats} />}
    </div>
  );
}
