import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import config from './config/config';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import reviewRoutes from './routes/reviewRoutes';
import { notFound, errorHandler } from './middlewares/errorMiddleware';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : 'http://localhost:5173',
    credentials: true
}));

// Logging middleware in development
if (config.nodeEnv === 'development') {
    app.use(morgan('dev'));
}

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/products/:productId/reviews', reviewRoutes);

// Error handling middleware - must be after routes
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
}); 