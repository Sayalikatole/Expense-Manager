const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory expenses array
let expenses = [];
let nextId = 1;

// Endpoint to update all expenses without a date to have today's date
app.post('/api/expenses/fix-missing-dates', (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  let updated = 0;
  expenses.forEach(e => {
    if (!e.date) {
      e.date = today;
      updated++;
    }
  });
  res.json({ message: `Updated ${updated} expenses with missing dates.` });
});

// Get all expenses, ensure each has a date
app.get('/api/expenses', (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  expenses.forEach(e => {
    if (!e.date) e.date = today;
    if (!e.category || typeof e.category !== 'string' || e.category.trim() === '') e.category = 'other';
  });
  res.json(expenses);
});

// Add a new expense
app.post('/api/expenses', (req, res) => {
  let { desc, amount, date, category } = req.body;
  console.log('Received payload:', req.body);
  if (!desc || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Description and amount are required.' });
  }
  // Always set date to today if missing, empty, or invalid
  if (!date || typeof date !== 'string' || date.trim() === '' || date.length < 10) {
    date = new Date().toISOString().slice(0, 10);
  }
  // Default category to 'other' if missing or invalid
  if (!category || typeof category !== 'string' || category.trim() === '') {
    category = 'other';
  }
  const expense = { id: nextId++, desc, amount, date, category };
  expenses.push(expense);
  // Always respond with all fields, including category
  console.log('Responding with:', { ...expense });
  res.status(201).json({ id: expense.id, desc: expense.desc, amount: expense.amount, date: expense.date, category: expense.category });
});

// Delete an expense
app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = expenses.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ error: 'Expense not found.' });
  expenses.splice(index, 1);
  res.json({ success: true });
});

// Edit an expense
app.put('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { desc, amount, date, category } = req.body;
  const expense = expenses.find(e => e.id === id);
  if (!expense) return res.status(404).json({ error: 'Expense not found.' });
  if (desc) expense.desc = desc;
  if (typeof amount === 'number') expense.amount = amount;
  if (date) expense.date = date;
  if (category && typeof category === 'string') expense.category = category;
  // Always respond with all fields, including category
  res.json({ ...expense });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});