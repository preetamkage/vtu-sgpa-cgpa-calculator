// src/components/ResultCard.jsx

/**
 * ResultCard
 *
 * Reusable presentational component for displaying a single numeric
 * result (SGPA now, potentially CGPA later) with a title label.
 *
 * Performs no calculation and holds no state — it simply renders
 * whatever `value` it is given.
 */
function ResultCard({ title, value }) {
  const displayValue = typeof value === 'number' ? value.toFixed(2) : value;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 sm:text-sm">
        {title}
      </p>
      <p className="mt-2 text-4xl font-bold tabular-nums text-blue-700 sm:text-5xl">
        {displayValue}
      </p>
    </div>
  );
}

export default ResultCard;