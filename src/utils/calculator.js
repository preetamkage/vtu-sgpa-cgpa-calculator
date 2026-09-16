/**
 * calculator.js
 *
 * Pure calculation/helper functions for the VTU SGPA & CGPA Calculator.
 * No React, no side effects — safe to import into any component.
 */

/**
 * Checks whether a raw input value should be treated as "empty"
 * (i.e. not filled in by the user, and therefore excluded from
 * calculations). This deliberately does NOT treat 0 as empty.
 *
 * @param {*} value - Raw value from an input field (string, number, etc.)
 * @returns {boolean} true if the value should be ignored.
 */
function isEmptyInput(value) {
  return value === null || value === undefined || value === '';
}

/**
 * Safely converts a raw mark input into a valid numeric mark (0-100),
 * or null if the input is empty or invalid.
 *
 * - Empty/null/undefined -> null (ignored, NOT treated as 0)
 * - Non-numeric / NaN -> null (ignored)
 * - Out of range (<0 or >100) -> null (ignored)
 * - Valid numeric string or number in [0, 100] -> number
 *
 * @param {*} rawMark - Raw mark value (string or number)
 * @returns {number|null}
 */
function parseValidMark(rawMark) {
  if (isEmptyInput(rawMark)) return null;

  // Allow both numbers and numeric strings; reject anything else.
  const mark = typeof rawMark === 'number' ? rawMark : Number(rawMark);

  if (Number.isNaN(mark)) return null;
  if (mark < 0 || mark > 100) return null;

  return mark;
}

/**
 * Converts a mark (0-100) into its grade point according to the
 * calculator's defined grading scale (1-10).
 *
 * Mapping:
 *  0-9   -> 1
 *  10-19 -> 2
 *  20-29 -> 3
 *  30-39 -> 4
 *  40-49 -> 5
 *  50-59 -> 6
 *  60-69 -> 7
 *  70-79 -> 8
 *  80-89 -> 9
 *  90-100-> 10
 *
 * @param {*} mark - Raw mark value (string, number, empty, etc.)
 * @returns {number|null} Grade point according to the calculator's
 *   defined grading scale (1-10), or null if the mark is
 *   empty/invalid and should be ignored by the caller.
 */
function getGradePoint(mark) {
  const validMark = parseValidMark(mark);
  if (validMark === null) return null;

  if (validMark === 100) return 10; // upper edge case
  return Math.floor(validMark / 10) + 1;
}

/**
 * Calculates SGPA from grouped subject marks.
 *
 * @param {Object} subjectGroups - Marks grouped by credit value, e.g.:
 *   {
 *     4: [83, 90, ''],
 *     3: [91, 91, ''],
 *     2: [99, '', ''],
 *     1: [93, 90, '']
 *   }
 *   Keys are credit values (number or numeric string), values are arrays
 *   of raw mark inputs (numbers, numeric strings, or '' / null / undefined
 *   for empty/unfilled fields).
 * @returns {number} SGPA rounded to 2 decimal places. Returns 0 if there
 *   are no valid (filled) subjects.
 */
function calculateSGPA(subjectGroups) {
  if (!subjectGroups || typeof subjectGroups !== 'object') return 0;

  let totalWeightedPoints = 0;
  let totalCredits = 0;

  Object.entries(subjectGroups).forEach(([creditKey, marks]) => {
    const credit = Number(creditKey);
    if (Number.isNaN(credit) || credit <= 0) return;
    if (!Array.isArray(marks)) return;

    marks.forEach((rawMark) => {
      const gradePoint = getGradePoint(rawMark);
      if (gradePoint === null) return; // empty or invalid -> ignored

      totalWeightedPoints += credit * gradePoint;
      totalCredits += credit;
    });
  });

  if (totalCredits === 0) return 0;

  const sgpa = totalWeightedPoints / totalCredits;
  return Math.round(sgpa * 100) / 100;
}

/**
 * Calculates CGPA from a list of completed semesters.
 *
 * @param {Array<Object>} semesters - Array of semester entries, e.g.:
 *   [
 *     { sgpa: 8.0, credits: 20 },
 *     { sgpa: 9.0, credits: 22 },
 *     { sgpa: 8.5, credits: 21 }
 *   ]
 *   A semester is considered valid only if both sgpa and credits are
 *   present, numeric, and credits > 0. Incomplete/invalid semester
 *   entries are ignored.
 * @returns {number} CGPA rounded to 2 decimal places. Returns 0 if there
 *   are no valid semesters.
 */
function calculateCGPA(semesters) {
  if (!Array.isArray(semesters)) return 0;

  let totalWeightedSGPA = 0;
  let totalCredits = 0;

  semesters.forEach((semester) => {
    if (!semester || typeof semester !== 'object') return;

    const { sgpa, credits } = semester;

    if (isEmptyInput(sgpa) || isEmptyInput(credits)) return;

    const numericSGPA = Number(sgpa);
    const numericCredits = Number(credits);

    if (Number.isNaN(numericSGPA) || Number.isNaN(numericCredits)) return;
    if (numericCredits <= 0) return;

    totalWeightedSGPA += numericSGPA * numericCredits;
    totalCredits += numericCredits;
  });

  if (totalCredits === 0) return 0;

  const cgpa = totalWeightedSGPA / totalCredits;
  return Math.round(cgpa * 100) / 100;
}

export { getGradePoint, calculateSGPA, calculateCGPA, parseValidMark };