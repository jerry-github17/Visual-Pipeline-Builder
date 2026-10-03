// apiNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { NodeBase } from "../node_components/NodeBase";

export const APINode = ({ id }) => {

  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");

  return (
    <NodeBase
      title="API"
      fields={[
        {
          type: "text",
          name: "url",
          label: "Endpoint",
          value: url,
          onChange: (e) => setUrl(e.target.value),
        },
        {
          type: "select",
          name: "method",
          label: "Method",
          value: method,
          options: ["GET", "POST", "PUT", "DELETE"],
          onChange: (e) => setMethod(e.target.value),
        },
      ]}
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: `${id}-input`,
        },
        {
          type: "source",
          position: Position.Right,
          id: `${id}-response`,
        },
      ]}
    />
  );
};