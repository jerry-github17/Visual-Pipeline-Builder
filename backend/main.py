from collections import defaultdict, deque
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Request Model
class Pipeline(BaseModel):
    nodes: list
    edges: list

@app.get("/")
def read_root():
    return {"Ping": "Pong"}
# Parse Pipeline
@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):

    nodes = pipeline.nodes
    edges = pipeline.edges
    num_nodes = len(nodes)
    num_edges = len(edges)

    # Building the graph
    graph = defaultdict(list)
    indegree = defaultdict(int)

    # Initializing in-degree for every node
    for node in nodes:
        indegree[node["id"]] = 0

    # Building adjacency list
    for edge in edges:
        source = edge["source"]
        target = edge["target"]

        graph[source].append(target)
        indegree[target] += 1

    # Applying Kahn's Algorithm from here
    queue = deque(
        [node for node in indegree if indegree[node] == 0]
    )
    visited = 0
    while queue:
        current = queue.popleft()
        visited += 1
        for neighbor in graph[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    is_dag = visited == num_nodes
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }