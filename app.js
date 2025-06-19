const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const tableRoutes = require('./routes/tableRoutes');
app.use('/api/tables', tableRoutes);
module.exports = app;
//hello wrold

