import React, { useEffect, useState } from 'react';
import { api } from './api';
import DynamicForm from './components/DynamicForm';
import CreateTable from './components/CreateTable';
import './App.css';

const App = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await api.get('/tables');
        console.log("Fetched tables:", res.data);
        setTables(res.data); // assume it returns an array
      } catch (err) {
        console.error('Failed to load tables:', err);
      }
    };

    fetchTables();
  }, []);

  const handleTableSelect = async (e) => {
    const tableId = e.target.value;
    console.log(tableId)
    if (!tableId) return;

    try {
      const res = await api.get(`/tables/${tableId}`);
      setSelectedTable(res.data);
      setFields(res.data.fields);
    } catch (err) {
      console.error('Failed to fetch table fields:', err);
    }
  };

  const handleSubmit = async (data) => {
    try {
      await api.post(`/tables/${selectedTable._id}/rows`, { data });
      alert('Row added!');
    } catch (err) {
      console.error('Error adding row:', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dynamic Table System</h1>

      <select onChange={handleTableSelect} defaultValue="">
        <option value="" disabled>Select a table</option>
        {tables.map((table) => (
          <option key={table._id} value={table._id}>
            {table.name}
          </option>
        ))}
      </select>
      <CreateTable/>

      {fields.length > 0 && (
        <>
          <h3 style={{ marginTop: 20 }}>Fill Form: {selectedTable.name}</h3>
          <DynamicForm fields={fields} onSubmit={handleSubmit} />
        </>
      )}
    </div>
  );
};

export default App;
