const express = require('express');
const router = express. Router();
const {
createTable,
addRecord,
getTables
} = require('../controllers/tableController') ;
router. post('/', createTable);
router. post('/:id/records', addRecord);
router.get('/', getTables);
module.exports = router;

