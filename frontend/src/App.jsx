import { useState } from 'react';
import AddMaintenanceForm from './AddMaintenanceForm';
import RecentRecords from './RecentRecords';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRecordAdded = () => {
    // Increment trigger to refresh recent records
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`absolute right-0 top-0 p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } shadow-md`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Auto-Reminder System
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Car Maintenance Scheduler with WhatsApp Notifications
          </p>
        </div>

        {/* Add Maintenance Form */}
        <AddMaintenanceForm darkMode={darkMode} onRecordAdded={handleRecordAdded} />

        {/* Recent Records Table */}
        <RecentRecords darkMode={darkMode} refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

export default App;
