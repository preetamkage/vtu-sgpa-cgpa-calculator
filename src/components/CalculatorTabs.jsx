// src/components/CalculatorTabs.jsx

/**
 * CalculatorTabs
 *
 * Presentational tab switcher between the SGPA and CGPA calculators.
 * Holds no state and no calculation logic — it only reports the
 * user's selection back to the parent via onTabChange.
 */
function CalculatorTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'sgpa', label: 'SGPA Calculator' },
    { id: 'cgpa', label: 'CGPA Calculator' },
  ];

  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div
        role="tablist"
        aria-label="Calculator selection"
        className="mx-auto flex w-full max-w-3xl px-4 sm:px-6"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 border-b-2 px-3 py-3 text-center text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-300 sm:text-base ${
                isActive
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CalculatorTabs;