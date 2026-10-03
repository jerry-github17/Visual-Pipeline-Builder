// NodeBase.js

import { Handle } from "reactflow";
import "./NodeBase.css";
export const NodeBase = ({
  title,
  fields = [],
  handles = [],
  width = 260,
  height = "auto",
  children,
}) => {
  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <label
            key={field.name}
            className="node-field"
          >
            <span>{field.label}</span>

            <input
              type="text"
              value={field.value}
              onChange={field.onChange}
            />
          </label>
        );

      case "number":
        return (
          <label
            key={field.name}
            className="node-field"
          >
            <span>{field.label}</span>
            <input
              type="number"
              value={field.value}
              onChange={field.onChange}
            />
          </label>
        );

      case "select":
        return (
          <label
            key={field.name}
            className="node-field"
          >
            <span>{field.label}</span>

            <select
              value={field.value}
              onChange={field.onChange}
            >
              {field.options.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>
          </label>
        );

      case "textarea":
        return (
          <label
            key={field.name}
            className="node-field"
          >
            <span>{field.label}</span>

            <textarea
              ref={field.inputRef}
              value={field.value}
              onChange={field.onChange}
              rows={field.rows || 3}
            />
          </label>
        );

      default:
        return null;
    }
  };
  return (
    <div
      className="node-base"
      style={{
        width,
        minHeight: height,
      }}
    >
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          {...handle}
        />
      ))}
      <div className="node-header">
        {title}
      </div>
      <div className="node-content">
        {fields.map(renderField)}
      </div>
      {children}
    </div>
  );
};