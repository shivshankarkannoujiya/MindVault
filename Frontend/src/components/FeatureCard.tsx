function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
      <div className="text-purple-600 mb-4 w-10 h-10">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard
