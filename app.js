const express = require('express');
const path = require('path');
const cors = require('cors');
require('./config/db');
const Expense = require('./models/Expense');
const corsOptions = {
  origin: [
    "https://task-management-frontend-flame.vercel.app",
    "http://localhost:3000",
    "http://localhost:4500",
    "http://127.0.0.1:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Add a new expense
app.post('/api/expenses', async (req, res) => {
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
});

// Delete an expense
app.delete('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Expense.findByIdAndDelete(id);
  if (!result) return res.status(404).json({ error: 'Expense not found.' });
  res.json({ success: true });
});

// Edit an expense
app.put('/api/expenses/:id', async (req, res) => {
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
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

module.exports = app;