const Table = require('../models/Table');

exports.createTable = async (req, res) => {
  try {

    const { name, fields } = req.body;
    const table = await Table.create({
      userId: req.user.id,
      name,
      fields,
      rows: [],
    });
    res.status(201).json(table);
    
  } catch (err) {
    
    res.status(500).json({ msg: err.message });
  }
};

exports.addRow = async (req, res) => {
  try {
    const table = await Table.findOne({ _id: req.params.tableId, userId: req.user.id });
    if (!table) return res.status(404).json({ msg: 'Table not found' });

    table.rows.push({ data: req.body });
    await table.save();
    res.json({ msg: 'Row added' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find({ userId: req.user.id });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getTableRows =async (req, res) => {
  try {
    const table = await Table.findOne({ _id: req.params.id, userId: req.user.id });
    if (!table) return res.status(404).json({ msg: 'Table not found' });
    res.json(table);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}
