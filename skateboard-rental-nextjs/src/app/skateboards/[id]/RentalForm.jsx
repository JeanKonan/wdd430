'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RentalForm({ skateboard }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For demo, using userId = 2 (the demo user from seed)
      const rentalData = {
        userId: 2,
        skateboardId: skateboard.id,
        startDate: formData.startDate,
        endDate: formData.endDate
      };

      const res = await fetch('/api/rentals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rentalData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create rental');
      }

      // Success! Redirect to rentals page
      alert(`Rental created successfully! Total: $${data.totalPrice}`);
      router.push('/rentals');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = () => {
    if (!formData.startDate || !formData.endDate) return null;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return null;
    
    return {
      days,
      total: days * skateboard.pricePerDay
    };
  };

  const priceEstimate = calculatePrice();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          required
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          required
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          min={formData.startDate || new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {priceEstimate && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">
              {priceEstimate.days} day{priceEstimate.days > 1 ? 's' : ''} × ${skateboard.pricePerDay}/day
            </span>
            <span className="text-2xl font-bold text-blue-600">
              ${priceEstimate.total}
            </span>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !formData.startDate || !formData.endDate}
        className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Processing...' : 'Book Now'}
      </button>

      <p className="text-sm text-gray-500 text-center">
        Booking as Demo User (demo@example.com)
      </p>
    </form>
  );
}
