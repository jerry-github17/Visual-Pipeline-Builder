// submit.js
import "./App.css";
import { useStore } from "./store";
export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));
    const handleSubmit = async () => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/pipelines/parse",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nodes,
                        edges,
                    }),
                }
            );
            const result = await response.json();
            alert(
`Pipeline Summary_
Number of Nodes : ${result.num_nodes}
Number of Edges : ${result.num_edges}
Is Directed Acyclic Graph (DAG) : ${result.is_dag ? "Yes" : "No"}`
            );
        } catch (error) {
            console.error(error);
            alert("Unable to connect to backend.");
        }
    };
    return (
        <div className="submit-container">
            <button className="submit-button" onClick={handleSubmit}>
            Analyze Pipeline
            </button>
        </div>
    );
};