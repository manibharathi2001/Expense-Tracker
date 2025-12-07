const express = require('express');
const router = require('./routes/expenseRoutes.js');
const cors = require('cors')

const app = express();

//middleware
app.use(express.json());
app.use(cors())

//api routes

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/', router)
module.exports = app