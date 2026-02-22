import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Grab. Ride. Go.</h1>
        <p>Find the perfect skateboard for your next adventure</p>
        <Link to="/rentals" className="btn btn-primary">
          Browse Skateboards
        </Link>
      </div>
      <div className="features">
        <div className="feature-card">
          <h3>Easy Booking</h3>
          <p>Reserve your skateboard in just a few clicks</p>
        </div>
        <div className="feature-card">
          <h3>Great Selection</h3>
          <p>Choose from our wide variety of quality skateboards</p>
        </div>
        <div className="feature-card">
          <h3>Affordable Prices</h3>
          <p>Competitive daily rates for everyone</p>
        </div>
      </div>
    </div>
  );
}
