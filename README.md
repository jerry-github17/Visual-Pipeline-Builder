# VectorShift Pipeline Builder

A React + FastAPI pipeline editor demonstrating reusable node abstractions, dynamic node behavior, graph-based pipeline validation, and frontend/backend integration.

This project was developed as part of a frontend technical assessment and extends a provided pipeline-editor starter application into a more scalable and polished workflow-building interface.

## Overview

The application allows users to visually construct pipelines by connecting different types of nodes on a canvas.

The project focuses on four key areas:

* **Reusable node architecture** — reducing duplicated React code through a configurable node abstraction.
* **Consistent UI design** — creating a unified visual system across different node types and application components.
* **Dynamic Text nodes** — automatically resizing nodes based on their content and generating input handles from `{{ variable }}` expressions.
* **Backend pipeline analysis** — sending the constructed graph to a FastAPI backend to calculate node/edge counts and determine whether the pipeline is a Directed Acyclic Graph (DAG).

## Tech Stack

### Frontend

* React
* JavaScript
* React Flow
* CSS
* HTML

### Backend

* Python
* FastAPI
* Uvicorn

### Architecture

```text
                    ┌──────────────────────────┐
                    │       React Frontend     │
                    │                          │
                    │  Pipeline Canvas         │
                    │  ├── Input Nodes         │
                    │  ├── Output Nodes        │
                    │  ├── LLM Nodes           │
                    │  ├── Text Nodes          │
                    │  └── Custom Nodes        │
                    │                          │
                    │  Node Abstraction Layer  │
                    └────────────┬─────────────┘
                                 │
                                 │ POST /pipelines/parse
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │      FastAPI Backend     │
                    │                          │
                    │  Pipeline Parser         │
                    │  ├── Node Count          │
                    │  ├── Edge Count          │
                    │  └── DAG Validation      │
                    └──────────────────────────┘
```

## Features

### 1. Reusable Node Abstraction

The original application contained multiple node implementations with significant amounts of repeated structure.

Instead of creating every new node by copying an existing component, the project introduces a reusable node abstraction that separates:

* Node configuration
* Display metadata
* Input/output handles
* Node content
* Styling
* Node-specific behavior

This allows new nodes to be created primarily through configuration rather than duplicating the entire component implementation.

Conceptually, nodes can be defined using a structure similar to:

```javascript
{
  type: "customNode",
  title: "Example Node",
  description: "Example node description",
  inputs: [...],
  outputs: [...],
  fields: [...]
}
```

The shared abstraction is responsible for rendering the common structure and behavior.

### 2. Additional Node Types

Five additional nodes were implemented to demonstrate the flexibility of the abstraction.

These nodes share the same underlying node architecture while allowing their configuration and behavior to differ.

This makes the system easier to extend as the number of available pipeline components grows.

### 3. Unified Styling

The application was redesigned with a consistent visual language across:

* Nodes
* Canvas
* Handles
* Buttons
* Inputs
* Text areas
* Toolbar
* Pipeline controls

The goal was to make the interface feel like a cohesive workflow-building application rather than a collection of independently styled components.

### 4. Dynamic Text Nodes

The Text node was extended with two dynamic behaviors.

#### Automatic Node Resizing

As the user enters more content, the Text node dynamically adjusts its dimensions.

This improves readability and prevents large amounts of text from being constrained inside a fixed-size node.

The resizing behavior takes the amount of content into account while maintaining reasonable minimum and maximum dimensions.

#### Variable Detection

Text nodes support variables using double-curly-brace syntax:

```text
Hello {{ name }}
```

Valid JavaScript-style variable names inside `{{ }}` are detected automatically.

For example:

```text
Generate a report for {{ customerName }}
```

creates an input handle corresponding to:

```text
customerName
```

Multiple variables are also supported:

```text
Summarize {{ document }} for {{ user }}
```

which generates separate input handles for:

* `document`
* `user`

This allows text nodes to dynamically adapt their graph interface based on their content.

### 5. Pipeline Backend Integration

Clicking the **Submit** button sends the current pipeline to the FastAPI backend.

The frontend submits:

```text
nodes
edges
```

to:

```text
POST /pipelines/parse
```

The backend then calculates:

* Number of nodes
* Number of edges
* Whether the graph is a Directed Acyclic Graph (DAG)

The API returns:

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

The frontend displays these results to the user after receiving the backend response.

## DAG Validation

The backend treats the pipeline as a directed graph where:

* Nodes represent pipeline components.
* Edges represent connections between components.
* Edge direction determines the flow of the pipeline.

The graph is considered a DAG when it contains no directed cycles.

For example:

```text
Input → Transform → LLM → Output
```

is a DAG.

Whereas:

```text
A → B → C
    ↑   │
    └───┘
```

contains a cycle and therefore is not a DAG.

The backend performs graph traversal to determine whether a cycle exists.

## Project Structure

```text
.
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── BaseNode.js
│   │   │   ├── InputNode.js
│   │   │   ├── OutputNode.js
│   │   │   ├── LLMNode.js
│   │   │   ├── TextNode.js
│   │   │   └── ...
│   │   │
│   │   ├── App.js
│   │   ├── submit.js
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── main.py
│   └── ...
│
└── README.md
```

## Running Locally

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Python 3.9+

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <repository-name>
```

### 2. Start the Backend

Navigate to the backend:

```bash
cd backend
```

Install the required Python dependencies:

```bash
pip install fastapi uvicorn
```

Start the development server:

```bash
uvicorn main:app --reload
```

The backend will run on:

```text
http://localhost:8000
```

### 3. Start the Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will be available at:

```text
http://localhost:3000
```

## Using the Application

1. Open the frontend in your browser.
2. Add nodes to the pipeline.
3. Connect nodes using their handles.
4. Add text to Text nodes.
5. Use variables such as:

```text
Hello {{ name }}
```

6. Observe dynamically generated input handles.
7. Create a pipeline with the desired connections.
8. Click **Submit**.
9. The frontend sends the pipeline to the FastAPI backend.
10. The backend analyzes the graph.
11. The application displays:

    * Number of nodes
    * Number of edges
    * DAG status

## API

### `POST /pipelines/parse`

Analyzes a pipeline graph.

#### Request

```json
{
  "nodes": [
    {
      "id": "1",
      "type": "input"
    },
    {
      "id": "2",
      "type": "output"
    }
  ],
  "edges": [
    {
      "source": "1",
      "target": "2"
    }
  ]
}
```

#### Response

```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

## Design Decisions

### Configuration over Duplication

Rather than maintaining separate implementations for every node, common rendering and behavior is centralized in a reusable abstraction.

This provides several benefits:

* Less duplicated code
* Consistent styling
* Faster node creation
* Easier maintenance
* Centralized changes to shared behavior

### Dynamic Graph Interfaces

Text variables are treated as part of the node's graph interface.

For example:

```text
Summarize {{ document }}
```

does not just represent text. It also declares that the node expects a `document` input.

The UI therefore derives its handles from the node's content.

### Frontend/Backend Separation

The frontend is responsible for:

* Pipeline construction
* User interaction
* Visual representation
* Sending graph data

The backend is responsible for:

* Graph analysis
* Node/edge counting
* DAG validation

This separation keeps the graph-processing logic independent from the UI.

## Potential Extensions

The architecture can be extended to support:

* Additional node types
* Node configuration panels
* Data validation
* Pipeline persistence
* Undo/redo
* Pipeline import/export
* Backend execution of pipelines
* Real-time collaboration
* More advanced graph validation
* Structured node schemas
* Variable type validation


Built with React, JavaScript, Python, and FastAPI.
