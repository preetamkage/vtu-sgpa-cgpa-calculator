// src/components/CreditInputGroup.jsx

/**
 * CreditInputGroup
 *
 * Reusable presentational component that renders a labeled group of
 * mark input fields for a single credit category (e.g. all 4-credit
 * subjects, all 3-credit subjects, etc.).
 *
 * This component holds NO state and performs NO calculations — it is
 * purely controlled by its parent via `values` and `onChange`.
 */
function CreditInputGroup({ credit, values, onChange }) {
  const handleInputChange = (index, rawValue) => {
    // Pass the raw string value straight up to the parent.
    // The parent owns the values array and decides how to store it.
    // We deliberately do NOT convert '' to 0 here.
    onChange(index, rawValue);
  };

  return (
    <fieldset className="mb-5 last:mb-0">
      <legend className="mb-2 text-sm font-semibold text-gray-700">
        {credit}-Credit {credit === 1 ? 'Subject' : 'Subjects'}
      </legend>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
        {values.map((value, index) => {
          const inputId = `credit-${credit}-mark-${index}`;

          return (
            <div key={inputId} className="flex flex-col">
              <label htmlFor={inputId} className="sr-only">
                {`Enter marks for ${credit}-credit subject ${index + 1}`}
              </label>
              <input
                id={inputId}
                type="number"
                inputMode="numeric"
                min="0"
                max="100"
                step="1"
                placeholder="Enter marks"
                aria-label={`Enter marks for ${credit}-credit subject ${index + 1}`}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export default CreditInputGroup;