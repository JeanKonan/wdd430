import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Redirect to login if no token
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user data and rentals
    fetchDashboardData(token);
  }, [navigate]);

  const fetchDashboardData = async (token) => {
    try {
      const userResponse = await fetch('http://localhost:5000/api/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const rentalsResponse = await fetch('http://localhost:5000/api/rentals', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData.user || userData);
      }

      if (rentalsResponse.ok) {
        const rentalsData = await rentalsResponse.json();
        setRentals(rentalsData.rentals || []);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRental = async (rentalId) => {
    if (!confirm('Are you sure you want to cancel this rental?')) {
      return;
    }

    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('You must be logged in to cancel rentals');
      navigate('/login');
      return;
    }

    try {
      console.log('Canceling rental:', rentalId);
      const response = await fetch(`http://localhost:5000/api/rentals/${rentalId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Cancel response status:', response.status);
      const data = await response.json();
      console.log('Cancel response data:', data);

      if (response.ok) {
        alert('Rental cancelled successfully!');
        // Refresh the rentals list
        fetchDashboardData(token);
      } else {
        alert(data.message || 'Failed to cancel rental');
      }
    } catch (err) {
      console.error('Error cancelling rental:', err);
      alert('Error cancelling rental. Check console for details.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return <div className="dashboard"><p>Loading...</p></div>;
  }

  return (
    <div className="dashboard">
      <h1>My Dashboard</h1>
      
      {user && (
        <div className="user-info">
          <h2>Welcome, {user.name || user.email}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}

      <div className="my-rentals">
        <h3>My Rentals</h3>
        {rentals.length === 0 ? (
          <p>You haven't rented any skateboards yet. <a href="/rentals">Start browsing</a></p>
        ) : (
          <ul>
            {rentals.map(rental => (
              <li key={rental.id}>
                <div className="rental-info">
                  <strong>Skateboard ID: {rental.skateboardId}</strong>
                  <p>Pickup: {new Date(rental.pickupDate).toLocaleString()}</p>
                  <p>Return: {new Date(rental.returnDate).toLocaleString()}</p>
                  <p>Status: <span className={`status ${rental.status}`}>{rental.status}</span></p>
                  <p>Total Price: ${rental.totalPrice}</p>
                </div>
                {rental.status !== 'cancelled' && rental.status !== 'completed' && (
                  <button 
                    onClick={() => handleCancelRental(rental.id)}
                    className="btn btn-cancel"
                  >
                    Cancel Rental
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleLogout} className="btn btn-secondary">
        Logout
      </button>
    </div>
  );
}
