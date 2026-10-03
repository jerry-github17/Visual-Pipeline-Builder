// loggerNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { NodeBase } from "../node_components/NodeBase";

export const LoggerNode = ({ id }) => {

  const [level, setLevel] = useState("Info");

  return (
    <NodeBase
      title="Logger"
      fields={[
        {
          type: "select",
          name: "level",
          label: "Log Level",
          value: level,
          options: [
            "Info",
            "Warning",
            "Error",
            "Debug",
          ],
          onChange: (e) => setLevel(e.target.value),
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
          id: `${id}-output`,
        },
      ]}
    />
  );
};