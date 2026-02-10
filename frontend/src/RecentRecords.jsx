import { useState, useEffect } from 'react';

function RecentRecords({ darkMode, refreshTrigger }) {
  const [recentEntries, setRecentEntries] = useState([]);

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // Fetch recent entries on component mount and when refreshTrigger changes
  useEffect(() => {
    fetchRecentEntries();
  }, [refreshTrigger]);

  const fetchRecentEntries = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/car-maintenance/recent?limit=10`);
      const data = await response.json();
      if (data.success) {
        setRecentEntries(data.data);
      }
    } catch (err) {
      console.error('Error fetching recent entries:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className={`shadow-xl rounded-lg p-8 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-semibold mb-6 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        Recent Entries
      </h2>
      
      {recentEntries.length === 0 ? (
        <p className={`text-center py-8 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          No entries yet. Submit the form above to add your first entry.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Car Number
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  WhatsApp Number
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Last Service
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Next Service
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Meter Reading
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Cost (₹)
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              darkMode 
                ? 'bg-gray-800 divide-gray-700' 
                : 'bg-white divide-gray-200'
            }`}>
              {recentEntries.map((entry) => (
                <tr key={entry._id} className={
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {entry.carRegistrationNumber}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {entry.ownerWhatsAppNumber}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {formatDate(entry.lastServiceDate)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {formatDate(entry.nextServiceDate)}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {entry.meterReading.toLocaleString()} km
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    ₹{entry.serviceCost.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentRecords;
