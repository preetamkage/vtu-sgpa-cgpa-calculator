// src/components/SemesterInputRow.jsx

/**
 * SemesterInputRow
 *
 * Reusable presentational component for a single semester's SGPA and
 * total semester credits inputs. Fully controlled by its parent —
 * holds no internal state and performs no calculations.
 */
function SemesterInputRow({ semester, sgpa, credits, onChange }) {
  const sgpaId = `semester-${semester}-sgpa`;
  const creditsId = `semester-${semester}-credits`;

  return (
    <div className="mb-3 rounded-lg border border-gray-200 bg-gray-50 p-3.5 sm:p-4">
      <p className="mb-2.5 text-sm font-semibold text-gray-700">
        Semester {semester}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor={sgpaId} className="mb-1 text-xs font-medium text-gray-600">
            SGPA
          </label>
          <input
            id={sgpaId}
            type="number"
            inputMode="decimal"
            min="0"
            max="10"
            step="0.01"
            placeholder="Enter SGPA"
            aria-label={`SGPA for semester ${semester}`}
            value={sgpa}
            onChange={(e) => onChange('sgpa', e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor={creditsId}
            className="mb-1 text-xs font-medium text-gray-600"
          >
            Total Semester Credits
          </label>
          <input
            id={creditsId}
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            placeholder="Enter total semester credits"
            aria-label={`Total semester credits for semester ${semester}`}
            value={credits}
            onChange={(e) => onChange('credits', e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-gray-400">
        Total credits for the entire semester, not a single subject.
      </p>
    </div>
  );
}

export default SemesterInputRow;