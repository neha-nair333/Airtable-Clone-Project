import React, { useState } from "react";

const DynamicForm = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (label, value) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const renderField = (field) => {
    const { label, type, required, options } = field;

    return (
      <div>
        {[
          "text",
          "number",
          "email",
          "url",
          "password",
          "tel",
          "textarea",
        ].includes(type) && (
          <input
            type={type === "textarea" ? "text" : type}
            required={required}
            value={formData[label] || ""}
            onChange={(e) => handleChange(label, e.target.value)}
          />
        )}

        {type === "dropdown" && (
          <select
            required={required}
            value={formData[label] || ""}
            onChange={(e) => handleChange(label, e.target.value)}
          >
            <option value="">-- Select --</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        {type === "checkbox" && (
          <input
            type="checkbox"
            checked={formData[label] || false}
            onChange={(e) => handleChange(label, e.target.checked)}
          />
        )}

        {/* Show error below the input */}
        {errors[label] && (
          <div style={{ color: "red", marginTop: "0.25rem" }}>
            {errors[label]}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.label];

      if (
        field.required &&
        (value === undefined || value === "" || value === null)
      ) {
        newErrors[field.label] = "This field is required.";
        return;
      }

      if (value) {
        switch (field.type) {
          case "number":
            if (isNaN(value)) newErrors[field.label] = "Must be a number.";
            break;
          case "email":
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
              newErrors[field.label] = "Must be a valid email.";
            break;
          case "url":
            try {
              new URL(value);
            } catch {
              newErrors[field.label] = "Must be a valid URL.";
            }
            break;
          case "tel":
            if (!/^\+?\d{7,15}$/.test(value))
              newErrors[field.label] = "Must be a valid phone number.";
            break;
          default:
            break;
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, idx) => (
        <div key={idx} style={{ marginBottom: "1rem" }}>
          <label>{field.label}:</label>
          {renderField(field)}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
