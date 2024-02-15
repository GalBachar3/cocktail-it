import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';

export const connectToDatabase = async () => {
    try {
        console.log(MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDb');
    } catch (error) {
        console.log(error);
    }
};