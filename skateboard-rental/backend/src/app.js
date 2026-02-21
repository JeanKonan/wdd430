import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/authRoutes.js';
import { skateboardRoutes } from './routes/skateboardRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skateboards', skateboardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running!' });
});

export { app };