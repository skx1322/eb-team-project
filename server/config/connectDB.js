import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_LINK){
    console.log("Missing Database URL");
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_LINK);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Database Cluster ran into an issue ", error);
        process.exit(1);
    };
};

export default connectDB;