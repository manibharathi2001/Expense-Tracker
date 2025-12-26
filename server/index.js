require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/mongo');

// Initial connection
connectDB().catch(err => {
    console.error('MDB Connection Error:', err.message);
});

module.exports = app;
