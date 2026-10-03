// llmNode.js

import { Position } from "reactflow";
import { NodeBase } from "../node_components/NodeBase";

export const LLMNode = ({ id }) => {
  return (
    <NodeBase
      title="LLM"
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: `${id}-system`,
          style: { top: "35%" },
        },
        {
          type: "target",
          position: Position.Left,
          id: `${id}-prompt`,
          style: { top: "65%" },
        },
        {
          type: "source",
          position: Position.Right,
          id: `${id}-response`,
        },
      ]}
    >
      <div className="node-description">
        Processes prompts using a Large Language Model and returns a response.
      </div>
    </NodeBase>
  );
}