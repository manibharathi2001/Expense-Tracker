
const expenseModel = require("../models/expenseModel")

module.exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await expenseModel.find({});
        res.status(200).json({ success: true, count: expenses.length, data: expenses })


    } catch (err) {
        res.status(500).json({ success: false, message: err.message })

    }

}

module.exports.updateExpense = async (req, res) => {
    try {
        const updateExpense = await expenseModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updateExpense) return res.status(404).json({ success: false, message: "Not found" })
        res.json({ success: true, data: updateExpense });


    } catch (err) {
        res.status(500).json({ success: false, message: err.message })

    }

};


module.exports.createExpense = async (req, res) => {
    try {
        console.log("Create Expense Request Body:", req.body);
        const { title, amount, category, date, description } = req.body;
        const expense = new expenseModel({
            description: title || description,
            amount,
            category,
            date,
            notes: description // Map description from frontend (notes) to notes in model
        });
        const newExpense = await expense.save()
        console.log("Expense Created:", newExpense);
        res.status(201).json({ success: true, data: newExpense })


    } catch (err) {
        console.error("Create Expense Error:", err);
        res.status(500).json({ success: false, message: err.message })

    }

};
module.exports.deleteExpense = async (req, res) => {
    try {
        const deleted = await expenseModel.findByIdAndDelete(req.params.id);

        if (!deleted) return res.status(404).json({ success: false, message: "Not found" })
        res.json({ success: true, message: "Deleted Succesfully" })


    } catch (err) {
        res.status(500).json({ success: false, message: err.message })

    }

};



