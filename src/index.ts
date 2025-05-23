import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import config from './config/config';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';
import reviewRoutes from './routes/reviewRoutes';
import { notFound, errorHandler } from './middlewares/errorMiddleware';

// Load environment variables
dotenv.config();

// Load Swagger document
const swaggerPath = path.join(process.cwd(), 'swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);

// Connect to MongoDB
connectDB();

const app = express();

const allowedOrigins = [
    'https://wap-project-react.onrender.com',
    'http://localhost:5173'
];

// Middleware
app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

// Logging middleware in development
if (config.nodeEnv === 'development') {
    app.use(morgan('dev'));
}

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
}); 