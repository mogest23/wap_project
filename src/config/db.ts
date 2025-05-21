import mongoose from 'mongoose';
import config from './config';

const connectDB = async (): Promise<void> => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('Connection URI:', config.mongodbUri.replace(/\/\/[^:]+:[^@]+@/, '//<credentials>@')); // Hide credentials in logs
        const conn = await mongoose.connect(config.mongodbUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Detailed MongoDB connection error:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        } else {
            console.error('Unknown error connecting to MongoDB:', error);
        }
        process.exit(1);
    }
};

export default connectDB; 