import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#16a34a", "#dc2626", "#eab308", "#2563eb"];

export default function TestStatusPie({ data }) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="text-sm font-medium text-slate-700 mb-4">
        Test Status Distribution
      </h3>

      <ResponsiveContainer width="100%" aspect={2}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
