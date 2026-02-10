import { useState } from 'react';

function AddMaintenanceForm({ darkMode, onRecordAdded }) {
  const [formData, setFormData] = useState({
    carRegistrationNumber: '',
    ownerWhatsAppNumber: '',
    lastServiceDate: '',
    meterReading: '',
    serviceCost: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/car-maintenance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Maintenance record created successfully!');
        // Reset form
        setFormData({
          carRegistrationNumber: '',
          ownerWhatsAppNumber: '',
          lastServiceDate: '',
          meterReading: '',
          serviceCost: '',
        });
        // Notify parent component
        if (onRecordAdded) {
          onRecordAdded();
        }
      } else {
        setError(data.message || 'Failed to create maintenance record');
      }
    } catch (err) {
      setError('Error submitting form: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`shadow-xl rounded-lg p-8 mb-8 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-semibold mb-6 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        Add Maintenance Record
      </h2>

      {/* Success/Error Messages */}
      {success && (
        <div className={`mb-4 p-4 rounded ${
          darkMode 
            ? 'bg-green-900 border border-green-700 text-green-200' 
            : 'bg-green-100 border border-green-400 text-green-700'
        }`}>
          {success}
        </div>
      )}
      {error && (
        <div className={`mb-4 p-4 rounded ${
          darkMode 
            ? 'bg-red-900 border border-red-700 text-red-200' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Car Registration Number */}
        <div>
          <label
            htmlFor="carRegistrationNumber"
            className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Car Registration Number
          </label>
          <input
            type="text"
            id="carRegistrationNumber"
            name="carRegistrationNumber"
            value={formData.carRegistrationNumber}
            onChange={handleChange}
            required
            placeholder="e.g., MH12AB1234"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>

        {/* Owner WhatsApp Number */}
        <div>
          <label
            htmlFor="ownerWhatsAppNumber"
            className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Owner WhatsApp Number (with country code)
          </label>
          <input
            type="tel"
            id="ownerWhatsAppNumber"
            name="ownerWhatsAppNumber"
            value={formData.ownerWhatsAppNumber}
            onChange={handleChange}
            required
            placeholder="e.g., +919876543210"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>

        {/* Last Service Date */}
        <div>
          <label
            htmlFor="lastServiceDate"
            className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Last Service Date
          </label>
          <input
            type="date"
            id="lastServiceDate"
            name="lastServiceDate"
            value={formData.lastServiceDate}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>

        {/* Meter Reading */}
        <div>
          <label
            htmlFor="meterReading"
            className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Meter Reading (km)
          </label>
          <input
            type="number"
            id="meterReading"
            name="meterReading"
            value={formData.meterReading}
            onChange={handleChange}
            required
            placeholder="e.g., 50000"
            min="0"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>

        {/* Service Cost */}
        <div>
          <label
            htmlFor="serviceCost"
            className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Service Cost (₹)
          </label>
          <input
            type="number"
            id="serviceCost"
            name="serviceCost"
            value={formData.serviceCost}
            onChange={handleChange}
            required
            placeholder="e.g., 5000"
            min="0"
            step="0.01"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Submitting...' : 'Submit Record'}
        </button>
      </form>
    </div>
  );
}

export default AddMaintenanceForm;
