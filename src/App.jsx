// src/App.jsx
import { useState } from 'react';
import Header from './components/Header';
import CalculatorTabs from './components/CalculatorTabs';
import SGPASection from './components/SGPASection';
import CGPASection from './components/CGPASection';
import './App.css';

/**
 * App
 *
 * Composition root for the VTU SGPA & CGPA Calculator module.
 * Only manages which calculator tab is active — all calculation
 * logic and section-specific state live inside SGPASection and
 * CGPASection respectively.
 */
function App() {
  const [activeTab, setActiveTab] = useState('sgpa');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CalculatorTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {activeTab === 'sgpa' ? <SGPASection /> : <CGPASection />}
      </main>
    </div>
  );
}

export default App;