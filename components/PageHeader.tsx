import Link from "next/link";

type PageHeaderProps = {
  backHref: string;
  breadcrumb: string;
  title: string;
};

export function PageHeader({ backHref, breadcrumb, title }: PageHeaderProps) {
  return (
    <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <div>
          <p className="text-xs text-gray-500">{breadcrumb}</p>
          <h1 className="text-lg font-bold text-gray-800 leading-tight">
            {title}
          </h1>
        </div>
      </div>
      <Link
        href={backHref}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Kembali
      </Link>
    </div>
  );
}
