const express = require('express');
const router = require('./routes/expenseRoutes.js');
const cors = require('cors')

const app = express();

//middleware
app.use(express.json());
app.use(cors({
    origin: 'https://expense-tracker-frontend-psi-ruby.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.get('/', (req, res) => {
    res.send('Expense Tracker API is running');
});

//api routes

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/', router)
module.exports = app