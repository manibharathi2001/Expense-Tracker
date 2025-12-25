const app = require('./app');
const connectDB = require('./config/mongo');
require('dotenv').config();

(async () => {
    await connectDB();
})();

module.exports = app;
