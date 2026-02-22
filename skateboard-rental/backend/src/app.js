import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/authRoutes.js';
import { skateboardRoutes } from './routes/skateboardRoutes.js';
import { rentalRoutes } from './routes/rentalRoutes.js';
import { userRoutes } from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skateboards', skateboardRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running!' });
});

// Debug endpoint to check headers
app.get('/api/debug-headers', (req, res) => {
    res.json({ headers: req.headers });
});

export { app };