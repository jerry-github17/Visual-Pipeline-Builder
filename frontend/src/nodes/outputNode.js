// outputNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { NodeBase } from "../node_components/NodeBase";

export const OutputNode = ({ id, data }) => {

  const [outputName, setOutputName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );

  const [outputType, setOutputType] = useState(
    data?.outputType || "Text"
  );

  return (
    <NodeBase
      title="Output"
      fields={[
        {
          type: "text",
          name: "outputName",
          label: "Name",
          value: outputName,
          onChange: (e) => setOutputName(e.target.value),
        },
        {
          type: "select",
          name: "outputType",
          label: "Type",
          value: outputType,
          options: ["Text", "Image"],
          onChange: (e) => setOutputType(e.target.value),
        },
      ]}
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: `${id}-value`,
        },
      ]}
    />
  );
};