const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createTable, addRow, getTables, getTableRows } = require('../controllers/tableController');

router.post('/', auth, createTable);
router.post('/:tableId/rows', auth, addRow);
router.get('/', auth, getTables);
router.get('/:id', auth,getTableRows);

module.exports = router;
