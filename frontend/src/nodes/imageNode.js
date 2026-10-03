// imageNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { NodeBase } from "../node_components/NodeBase";

export const ImageNode = ({ id }) => {

  const [format, setFormat] = useState("PNG");

  return (
    <NodeBase
      title="Image"
      fields={[
        {
          type: "select",
          name: "format",
          label: "Format",
          value: format,
          options: ["PNG", "JPG", "WEBP"],
          onChange: (e) => setFormat(e.target.value),
        },
      ]}
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: `${id}-image`,
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