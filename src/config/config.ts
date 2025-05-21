import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
};

export default config; 