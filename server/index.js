const app = require('./app');
const connectDB = require('./config/mongo');
require('dotenv').config();

connectDB();

module.exports = app;
