const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getAllExpenses);
router.post('/', expenseController.addExpense);
router.delete('/:id', expenseController.deleteExpense);
router.put('/:id', expenseController.editExpense);

module.exports = router;
