const Expense = require('../models/Expense');

exports.getAllExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
};

exports.addExpense = async (req, res) => {
  let { desc, amount, date, category } = req.body;
  if (!desc || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Description and amount are required.' });
  }
  if (!date || typeof date !== 'string' || date.trim() === '' || date.length < 10) {
    date = new Date().toISOString().slice(0, 10);
  }
  if (!category || typeof category !== 'string' || category.trim() === '') {
    category = 'other';
  }
  const expense = new Expense({ desc, amount, date, category });
  await expense.save();
  res.status(201).json(expense);
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  const result = await Expense.findByIdAndDelete(id);
  if (!result) return res.status(404).json({ error: 'Expense not found.' });
  res.json({ success: true });
};

exports.editExpense = async (req, res) => {
  const { id } = req.params;
  const { desc, amount, date, category } = req.body;
  const expense = await Expense.findById(id);
  if (!expense) return res.status(404).json({ error: 'Expense not found.' });
  if (desc) expense.desc = desc;
  if (typeof amount === 'number') expense.amount = amount;
  if (date) expense.date = date;
  if (category && typeof category === 'string') expense.category = category;
  await expense.save();
  res.json(expense);
};
