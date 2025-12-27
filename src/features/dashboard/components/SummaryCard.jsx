const variants = {
  neutral: {
    bg: "bg-slate-50",
    border: "border-slate-300",
    text: "text-slate-800",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-300",
    text: "text-green-700",
  },
  danger: {
    bg: "bg-red-50",
    border: "border-red-300",
    text: "text-red-700",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    text: "text-yellow-700",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-300",
    text: "text-blue-700",
  },
};

export default function SummaryCard({ title, value, variant = "neutral" }) {
  const styles = variants[variant];

  return (
    <div className={`rounded-xl border ${styles.bg} ${styles.border} p-5`}>
      <p className="text-sm text-slate-600">{title}</p>
      <p className={`mt-2 text-2xl font-semibold ${styles.text}`}>{value}</p>
    </div>
  );
}
