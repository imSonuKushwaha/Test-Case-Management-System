import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PriorityBar({ data }) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="text-sm font-medium text-slate-700 mb-4">
        Pass / Fail by Priority
      </h3>

      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart data={data}>
          <XAxis dataKey="priority" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="pass" fill="#16a34a" />
          <Bar dataKey="fail" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
