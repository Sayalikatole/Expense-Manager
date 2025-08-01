const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// CORS middleware for Vercel serverless
router.use((req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4500');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          res.setHeader('Access-Control-Allow-Credentials', 'true');
        
          if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
          }
        
          next();
        });

router.get('/', expenseController.getAllExpenses);
router.post('/', expenseController.addExpense);
router.delete('/:id', expenseController.deleteExpense);
router.put('/:id', expenseController.editExpense);

module.exports = router;
