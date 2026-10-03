// textNode.js
import { useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import { NodeBase } from "../node_components/NodeBase";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");

  const textareaRef = useRef(null);
  const [textAreaHeight, setTextAreaHeight] = useState(80);

  // Find valid JavaScript-style variable names inside {{ }}
  const variables = useMemo(() => {
    const regex = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;
    const found = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      found.push(match[1]);
    }

    // Remove duplicate variables
    return [...new Set(found)];
  }, [text]);

  // Automatically grow or shrink the textarea based on its content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    // Reset the previous height so the textarea can shrink
    textarea.style.height = "auto";

    // Calculate the height required by the current content
    const newHeight = Math.max(textarea.scrollHeight, 80);
    textarea.style.height = `${newHeight}px`;
    setTextAreaHeight(newHeight);
  }, [text]);

  // Calculate node width from the longest line
  const lines = text.split("\n");
  const longestLine = Math.max(
    ...lines.map((line) => line.length),
    20
  );

  // Keep the node within reasonable limits
  const width = Math.min(
    Math.max(260, longestLine * 8),
    500
  );

  const height = textAreaHeight + 85;
  return (
    <NodeBase
      title="Text"
      width={width}
      height={height}
      fields={[
        {
          type: "textarea",
          name: "text",
          label: "Text",
          value: text,
          onChange: (e) => setText(e.target.value),
          inputRef: textareaRef,
        },
      ]}
      handles={[
        {
          type: "source",
          position: Position.Right,
          id: `${id}-output`,
        },
      ]}
    >
      {variables.map((variable, index) => {
        const handlePosition =
          35 + ((index + 1) / (variables.length + 1)) * 40;

        return (
          <Handle
            key={`${id}-${variable}`}
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            isConnectable={true}
            style={{
              top: `${handlePosition}%`,
            }}
          />
        );
      })}
    </NodeBase>
  );
};