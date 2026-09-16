// src/components/CGPASection.jsx
import { useState } from 'react';
import SemesterInputRow from './SemesterInputRow';
import ResultCard from './ResultCard';
import { calculateCGPA } from '../utils/calculator';

const MAX_SEMESTERS = 8;

const createEmptySemesters = (count) =>
  Array.from({ length: count }, () => ({ sgpa: '', credits: '' }));

/**
 * CGPASection
 *
 * Main CGPA calculator interface. Lets the student pick how many
 * semesters they've completed, collects SGPA + total semester credits
 * for each, and displays the computed CGPA via ResultCard.
 *
 * All CGPA formula logic lives in ../utils/calculator — this
 * component only manages selection/input state and wiring.
 */
function CGPASection() {
  const [semesterCount, setSemesterCount] = useState(1);
  const [semesters, setSemesters] = useState(() => createEmptySemesters(1));
  const [cgpa, setCgpa] = useState(0);

  const handleSemesterCountChange = (event) => {
    const newCount = Number(event.target.value);
    setSemesterCount(newCount);

    setSemesters((prevSemesters) => {
      if (newCount <= prevSemesters.length) {
        // Trim extra rows, keep existing data for the retained ones.
        return prevSemesters.slice(0, newCount);
      }
      // Grow the array, keeping existing data and adding empty rows.
      const additionalRows = createEmptySemesters(newCount - prevSemesters.length);
      return [...prevSemesters, ...additionalRows];
    });
  };

  const handleSemesterFieldChange = (index, field, rawValue) => {
    setSemesters((prevSemesters) => {
      const updated = [...prevSemesters];
      updated[index] = {
        ...updated[index],
        [field]: rawValue,
      };
      return updated;
    });
  };

  const handleCalculate = () => {
    const result = calculateCGPA(semesters);
    setCgpa(result);
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-8">
      <div className="mb-5 sm:mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          CGPA Calculator
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
          Select how many semesters you have completed, then enter the
          SGPA and total semester credits for each one.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 sm:mb-6">
          <label
            htmlFor="semester-count"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            How many semesters have you completed?
          </label>
          <select
            id="semester-count"
            value={semesterCount}
            onChange={handleSemesterCountChange}
            className="w-full max-w-40 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {Array.from({ length: MAX_SEMESTERS }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div>
          {semesters.map((semester, index) => (
            <SemesterInputRow
              key={index}
              semester={index + 1}
              sgpa={semester.sgpa}
              credits={semester.credits}
              onChange={(field, rawValue) =>
                handleSemesterFieldChange(index, field, rawValue)
              }
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-2 w-full rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 sm:w-auto"
        >
          Calculate CGPA
        </button>
      </div>

      <div className="mt-5 sm:mt-6">
        <ResultCard title="Your CGPA" value={cgpa} />
      </div>
    </section>
  );
}

export default CGPASection;