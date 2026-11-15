import mongoose from 'mongoose';

const connectDB = async () =>{
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongo DB connected: ${connect.connection.host}`);
    
}

export default connectDB;