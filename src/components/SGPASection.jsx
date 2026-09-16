// src/components/SGPASection.jsx
import { useState } from 'react';
import CreditInputGroup from './CreditInputGroup';
import ResultCard from './ResultCard';
import { calculateSGPA } from '../utils/calculator';

const CREDIT_LEVELS = [4, 3, 2, 1];

const createInitialMarks = () => ({
  4: ['', '', ''],
  3: ['', '', ''],
  2: ['', '', ''],
  1: ['', '', ''],
});

/**
 * SGPASection
 *
 * Main SGPA calculator interface. Owns the raw mark values for all
 * four credit categories, renders one CreditInputGroup per category,
 * and displays the computed SGPA via ResultCard.
 *
 * All grading/calculation logic lives in ../utils/calculator — this
 * component only manages input state and wiring.
 */
function SGPASection() {
  const [marksByCredit, setMarksByCredit] = useState(createInitialMarks);
  const [sgpa, setSgpa] = useState(0);

  const handleMarkChange = (credit, index, rawValue) => {
    setMarksByCredit((prevMarks) => {
      const updatedGroup = [...prevMarks[credit]];
      // Preserve the raw string exactly as typed — no coercion to
      // number, no converting '' to 0.
      updatedGroup[index] = rawValue;

      return {
        ...prevMarks,
        [credit]: updatedGroup,
      };
    });
  };

  const handleCalculate = () => {
    const result = calculateSGPA(marksByCredit);
    setSgpa(result);
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-8">
      <div className="mb-5 sm:mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          SGPA Calculator
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
          Enter your marks under the credit category of the subject.
          Leave a field empty if you have not taken that subject —
          entering 0 will still be counted as a valid mark.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        {CREDIT_LEVELS.map((credit) => (
          <CreditInputGroup
            key={credit}
            credit={credit}
            values={marksByCredit[credit]}
            onChange={(index, rawValue) => handleMarkChange(credit, index, rawValue)}
          />
        ))}

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-1 w-full rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 sm:w-auto"
        >
          Calculate SGPA
        </button>
      </div>

      <div className="mt-5 sm:mt-6">
        <ResultCard title="Your SGPA" value={sgpa} />
      </div>
    </section>
  );
}

export default SGPASection;