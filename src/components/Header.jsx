// src/components/Header.jsx

/**
 * Header
 *
 * Main header for the VTU SGPA & CGPA Calculator module.
 * Purely presentational — no state, no logic.
 */
function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-5 text-center sm:px-6 sm:py-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-600 sm:text-xs">
          Towards Connected Campus
        </p>
        <h1 className="mt-1 text-xl font-bold leading-snug text-gray-900 sm:text-2xl md:text-3xl">
          Visvesvaraya Technological University (VTU)
        </h1>
        <p className="mt-1.5 text-sm text-gray-500 sm:text-base">
          SGPA &amp; CGPA Calculator
        </p>
      </div>
    </header>
  );
}

export default Header;