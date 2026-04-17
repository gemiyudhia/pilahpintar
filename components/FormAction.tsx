import Link from "next/link";

type FormActionsProps = {
  cancelHref: string;
  loading: boolean;
  disabled: boolean;
};

export function FormActions({
  cancelHref,
  loading,
  disabled,
}: FormActionsProps) {
  return (
    <div className="flex gap-3 justify-end">
      <Link href={cancelHref}>
        <button
          type="button"
          className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Batal
        </button>
      </Link>
      <button
        type="submit"
        disabled={disabled}
        className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2"
      >
        {loading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Menyimpan...
          </>
        ) : (
          <>
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            Simpan Kerajinan
          </>
        )}
      </button>
    </div>
  );
}
