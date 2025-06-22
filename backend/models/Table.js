const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    type: { type: String, required: true },
    required: { type: Boolean, default: false },
    options: { type: [String], default: undefined }, 
  },
  { _id: false }
);

const TableSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  fields: { type: [FieldSchema], required: true },
  rows: [
    {
      data: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model('Table', TableSchema);
