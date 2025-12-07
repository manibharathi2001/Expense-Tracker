const express=require('express');
const { getAllExpenses, createExpense, updateExpense, deleteExpense } = require('../controller/expenseController');

const router=express.Router();

router.get('/expenses',getAllExpenses).post('/expenses',createExpense)
router.put('/expenses/:id',updateExpense).delete('/expenses/:id',deleteExpense)


module.exports=router;