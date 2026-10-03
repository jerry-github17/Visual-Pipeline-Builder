// delayNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { NodeBase } from "../node_components/NodeBase";

export const DelayNode = ({ id }) => {

  const [seconds, setSeconds] = useState(1);

  return (
    <NodeBase
      title="Delay"
      fields={[
        {
          type: "number",
          name: "seconds",
          label: "Seconds",
          value: seconds,
          onChange: (e) => setSeconds(e.target.value),
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