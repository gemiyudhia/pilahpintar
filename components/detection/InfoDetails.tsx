export function InfoDetails({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
