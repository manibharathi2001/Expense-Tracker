const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100

    },
    amount: {
        type: Number,
        required: true,
        min: 0.01
    },
    category: {
        type: String,
        required: true,
        enum: ["Food", "Transportation", "Entertainment", "Shopping", "Bills", "HealthCare", "Others"]
    },
    date: {
        type: Date, default: Date.now()

    },
    notes: {
        type: String,
        trim: true,
        maxlength: 500
    },
}, { timestamps: true }

);

expenseSchema.pre("save", async function () {
    if (this.amount) this.amount = Math.round(this.amount * 100) / 100;
})
const expenseModel = mongoose.model('expense', expenseSchema);

module.exports = expenseModel;