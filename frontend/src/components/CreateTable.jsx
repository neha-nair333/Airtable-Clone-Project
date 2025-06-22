import React, { useState } from "react";
import { api } from "../api";

const fieldTypes = [
  "text",
  "number",
  "date",
  "dropdown",
  "checkbox",
  "email",
  "url",
  "textarea",
  "password",
  "tel",
];

const CreateTable = () => {
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({
    label: "",
    type: "",
    required: false,
    options: [],
  });

  const handleAddField = () => {
    if (!newField.label || !newField.type)
      return alert("Field label and type are required.");

    // For dropdown: validate options
    if (newField.type === "dropdown" && newField.options.length === 0) {
      return alert("Dropdown fields must have at least one option.");
    }

    setFields([...fields, newField]);
    setNewField({ label: "", type: "", required: false, options: [] });
  };

  const handleSubmit = async () => {
    if (!name) return alert("Table name is required.");
    if (fields.length < 1) return alert("Add at least one field.");

    try {
      const res = await api.post("/tables", { name, fields });
      alert("Table created successfully!");
      setName("");
      setFields([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create table");
    }
  };

  return (
    <div>
      <h2>Create New Table</h2>

      <label>Table Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <h4>Add Field</h4>
      <input
        placeholder="Label"
        value={newField.label}
        onChange={(e) => setNewField({ ...newField, label: e.target.value })}
      />
      <select
        value={newField.type}
        onChange={(e) => setNewField({ ...newField, type: e.target.value })}
      >
        <option value="">-- Select Type --</option>
        {fieldTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {newField.type === "dropdown" && (
        <input
          placeholder="Comma-separated options"
          onChange={(e) =>
            setNewField({
              ...newField,
              options: e.target.value.split(",").map((opt) => opt.trim()),
            })
          }
        />
      )}

      <div className="checkbox-row">
        <input
          type="checkbox"
          id="required-checkbox"
          checked={newField.required}
          onChange={(e) =>
            setNewField({ ...newField, required: e.target.checked })
          }
        />
        <label htmlFor="required-checkbox">Required</label>
      </div>

      <button onClick={handleAddField}>+ Add Field</button>

      <ul>
        {fields.map((f, i) => (
          <li key={i}>
            {f.label} ({f.type}) {f.required ? "✔️" : ""}
          </li>
        ))}
      </ul>

      <button onClick={handleSubmit}>🚀 Create Table</button>
    </div>
  );
};

export default CreateTable;
