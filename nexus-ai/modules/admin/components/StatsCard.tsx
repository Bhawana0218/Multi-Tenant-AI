export function StatsCard({ title, value }: any) {
  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}