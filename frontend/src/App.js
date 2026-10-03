import "./App.css";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
    return (
        <div className="app">
            <header>
                <h1>Pipeline Builder: Frontend Technical Assessment_Abraham Jerry</h1>
            </header>
            <PipelineToolbar />
            <PipelineUI />
            <SubmitButton />
        </div>
    );
}
export default App;