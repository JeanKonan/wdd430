import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skateboard, setSkateboard] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchSkateboard();
  }, [id, navigate]);

  const fetchSkateboard = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/skateboards/${id}`);
      
      if (response.ok) {
        const data = await response.json();
        setSkateboard(data.skateboard || data);
      } else {
        setError('Skateboard not found');
      }
    } catch (err) {
      setError('Error loading skateboard details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!startDate || !endDate || !skateboard) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Check if return is before pickup
    if (end <= start) return 0;
    
    // Calculate total minutes
    const totalMinutes = Math.ceil((end - start) / (1000 * 60));
    // Convert to hours (any partial hour counts as full hour)
    const hours = Math.ceil(totalMinutes / 60);
    
    return (hours * skateboard.pricePerHour).toFixed(2);
  };

  const calculateHours = () => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end <= start) return 0;
    
    const totalMinutes = Math.ceil((end - start) / (1000 * 60));
    return Math.ceil(totalMinutes / 60);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      setError('Please select both dates');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Validate dates
    if (end <= start) {
      setError('Return date must be after pickup date');
      return;
    }

    if (start < new Date()) {
      setError('Pickup date cannot be in the past');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/rentals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          skateboardId: parseInt(id),
          pickupDate: startDate,
          returnDate: endDate
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Rental booked successfully!');
        navigate('/dashboard');
      } else {
        setError(data.message || 'Booking failed');
      }
    } catch (err) {
      setError('Error processing booking');
      console.error(err);
    }
  };

  if (loading) return <div className="checkout"><p>Loading...</p></div>;
  if (error) return <div className="checkout error"><p>{error}</p></div>;
  if (!skateboard) return <div className="checkout"><p>Skateboard not found</p></div>;

  return (
    <div className="checkout">
      <div className="checkout-container">
        <div className="skateboard-details">
          <h1>Book Your Skateboard</h1>
          <div className="skateboard-info">
            <h2>{skateboard.name}</h2>
            <p><strong>Brand:</strong> {skateboard.brand}</p>
            <p><strong>Type:</strong> {skateboard.type}</p>
            <p><strong>Price:</strong> ${skateboard.pricePerHour} per hour</p>
          </div>
        </div>

        <form onSubmit={handleCheckout} className="checkout-form">
          <h3>Select Rental Period</h3>
          
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="startDate">Pickup Date & Time:</label>
            <input
              id="startDate"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">Return Date & Time:</label>
            <input
              id="endDate"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          {startDate && endDate && (
            <div className="price-summary">
              <p><strong>Total Hours:</strong> {calculateHours()}</p>
              <p className="total"><strong>Total Price:</strong> ${calculateTotal()}</p>
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Complete Booking
          </button>

          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/rentals')}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
