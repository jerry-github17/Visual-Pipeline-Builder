// toolbar.js
import { DraggableNode } from './draggableNode';
export const PipelineToolbar = () => {
    return (
        <div className="pipeline-toolbar">
            <div className="toolbar-grid">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />

                <DraggableNode type="api" label="API" />
                <DraggableNode type="image" label="Image" />
                <DraggableNode type="email" label="Email" />
                <DraggableNode type="delay" label="Delay" />
                <DraggableNode type="logger" label="Logger" />
            </div>
        </div>
    );
};
