// emailNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { NodeBase } from "../node_components/NodeBase";

export const EmailNode = ({ id }) => {

  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <NodeBase
      title="Email"
      fields={[
        {
          type: "text",
          name: "recipient",
          label: "Recipient",
          value: recipient,
          onChange: (e) => setRecipient(e.target.value),
        },
        {
          type: "text",
          name: "subject",
          label: "Subject",
          value: subject,
          onChange: (e) => setSubject(e.target.value),
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
          id: `${id}-sent`,
        },
      ]}
    />
  );
};