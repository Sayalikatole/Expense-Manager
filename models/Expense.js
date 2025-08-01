const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  desc: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  category: { type: String, default: 'other' }
});

module.exports = mongoose.model('Expense', expenseSchema);