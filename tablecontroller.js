const table = createTable({ name, fields });
await table.save();
res. status(201). json(table);
};
exports. addRecord = async (req, res) => {
const table = await Table. findById(req. params. id);
table. records. push(req. body);
await table.save();
res. status(201). json(table);
};
exports. getTables = async (req, res) =>