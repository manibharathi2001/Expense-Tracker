const express = require('express');
const router = require('./routes/expenseRoutes.js');
const cors = require('cors')

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow localhost for development
        if (origin.startsWith('http://localhost')) {
            return callback(null, true);
        }

        // Allow all Vercel preview and production URLs
        if (origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }

        // Reject other origins (don't throw error, just return false)
        callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options(/(.*)/, cors(corsOptions));

//middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Expense Tracker API is running');
});

//api routes

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/', router)
module.exports = app