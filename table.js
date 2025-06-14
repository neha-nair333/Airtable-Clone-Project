const mongoose = require('mongoose');
const tableSchema = new mongoose.Schema({
name: String,
fields:
[
{ name: String, type: String },// e.g., text, number, checkbox
],
records:
[ { type: mongoose.Schema.Types.Mixed },// flexible record
],
createdBy: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User'
}
});
module.exports = mongoose.model('Table', tableSchema);