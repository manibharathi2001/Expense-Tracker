const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("Mongo DB Connected");

        })
    } catch (err) {
        console.error("MongoDB connection error:", err);
        // Do not exit process in serverless environment
    }
}

module.exports = connectDB;