import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExecutionTrendLine({ data }) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="text-sm font-medium text-slate-700 mb-4">
        Execution Trend
      </h3>

      <ResponsiveContainer width="100%" aspect={2}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="executed"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
  );
}
