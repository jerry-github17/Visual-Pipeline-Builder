// inputNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { NodeBase } from "../node_components/NodeBase";

export const InputNode = ({ id, data }) => {

  const [inputName, setInputName] = useState(data?.inputName || id.replace("customInput-", "input_"));
  const [inputType, setInputType] = useState(data.inputType || "Text");

  return (
    <NodeBase
      title="Input"
      fields={[
        {
          type: "text",
          name: "inputName",
          label: "Name",
          value: inputName,
          onChange: (e) => setInputName(e.target.value),
        },
        {
          type: "select",
          name: "inputType",
          label: "Type",
          value: inputType,
          options: ["Text", "File"],
          onChange: (e) => setInputType(e.target.value),
        },
      ]}
      handles={[
        {
          type: "source",
          position: Position.Right,
          id: `${id}-value`,
        },
      ]}
    />
  );
};