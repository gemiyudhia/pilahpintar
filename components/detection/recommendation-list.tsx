import { CheckCircle2 } from "lucide-react";

export function RecommendationList({ steps }: { steps: string[] }) {
  return (
    <div>
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-green-600" />
        Langkah Penanganan
      </h3>
      <ul className="space-y-4 mb-8">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-3 items-start">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-50 text-green-700 text-xs font-bold shrink-0 mt-0.5 border border-green-200">
              {index + 1}
            </span>
            <span className="text-gray-600 text-sm">{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
