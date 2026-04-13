import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // console.log(`${process.env.DB_URI}/${process.env.DB_NAME}`);
        
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
        
        console.log(`\nDB connected, DB host ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log('Mongo DB connection failed', error);
        process.exit(1);
    }
}

export { connectDB }