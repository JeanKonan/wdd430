import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rentals.css';

export default function Rentals() {
  const [skateboards, setSkateboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSkateboards();
  }, []);

  const fetchSkateboards = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/skateboards');
      
      if (response.ok) {
        const data = await response.json();
        setSkateboards(data.skateboards || []);
      } else {
        setError('Failed to load skateboards');
      }
    } catch (err) {
      setError('Connection error. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRent = (skateboardId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // TODO: Implement rental booking logic
    navigate(`/checkout/${skateboardId}`);
  };

  if (loading) return <div className="rentals"><p>Loading...</p></div>;
  if (error) return <div className="rentals error"><p>{error}</p></div>;

  return (
    <div className="rentals">
      <h1>Available Skateboards</h1>
      
      {skateboards.length === 0 ? (
        <p>No skateboards available at the moment.</p>
      ) : (
        <div className="skateboards-grid">
          {skateboards.map(board => (
            <div key={board.id} className="skateboard-card">
              <h3>{board.name}</h3>
              <p className="brand">Brand: {board.brand || 'N/A'}</p>
              <p className="price">${board.pricePerHour} per hour</p>
              <p className="condition">Type: {board.type || 'N/A'}</p>
              <button 
                onClick={() => handleRent(board.id)}
                className="btn btn-primary"
              >
                Rent Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
