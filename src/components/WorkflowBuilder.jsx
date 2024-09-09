// src/components/WorkflowBuilder.js
import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDispatch, useSelector } from "react-redux";
import { addWorkflow } from "../store/workflowSlice";
import { nodeTypes } from "./NodeTypes"; 
import axios from "axios";

const WorkflowBuilder = () => {
  const dispatch = useDispatch();
  const workflows = useSelector((state) => state.workflow.workflows);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = (changes) =>
    setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes) =>
    setEdges((eds) => applyEdgeChanges(changes, eds));
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
  // add a new node
  const addNode = (type) => {
    const newNode = {
      id: `node_${nodes.length + 1}`, // unique id ko generate karta hai for each node
      type: type, // node type ko btata hai (e.g. 'filter', 'wait', etc.)
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // random initial position ko btata hai
      data: { label: `${type} Node` }, // define label or any data specific to this node
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveWorkflow = async () => {
    const workflow = {
      id: `workflow_${new Date().getTime()}`,
      nodes,
      edges,
    };

    try {
      // Send workflow data to backend to save in the database
      const response = await axios.post(
        "http://localhost:5000/api/workflows",
        workflow
      );
      if (response.data.success) {
        dispatch(addWorkflow(workflow));
        alert("Workflow saved successfully!");
      }
    } catch (error) {
      console.error("Error saving workflow:", error);
      alert("Failed to save workflow. Please try again.");
    }
  };

  return (
    <div className="py-10 px-4 m-auto text-center border md:w-[80%] w-full h-screen">
      <h1 className="text-3xl border-b-2 border-black w-fit m-auto font-bold mb-4 text-center">WORKFLOW BUILDER</h1>
      <div className="mb-4 gap-2 flex md:flex-row flex-col text-center">
        <button
          onClick={() => addNode("start")}
          className="p-2 bg-black text-white rounded mr-2"
        >
          Add Start Node
        </button>
        <button
          onClick={() => addNode("filter")}
          className="p-2 bg-blue-500 text-white rounded mr-2"
        >
          Add Filter Node
        </button>
        <button
          onClick={() => addNode("wait")}
          className="p-2 bg-yellow-500 text-white rounded mr-2"
        >
          Add Wait Node
        </button>
        <button
          onClick={() => addNode("convert")}
          className="p-2 bg-green-500 text-white rounded mr-2"
        >
          Add Convert Node
        </button>
        <button
          onClick={() => addNode("sendPost")}
          className="p-2 bg-red-500 text-white rounded"
        >
          Add Send Post Node
        </button>
        <button
          onClick={() => addNode("end")}
          className="mx-2 p-2 bg-gray-600 text-white rounded"
        >
          Add End Node
        </button>
      </div>
      <div className="md:h-[90%] h-[60%] w-full text-center m-auto border-2 border-black">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded text-center m-auto"
        onClick={saveWorkflow}
      >
        Save Workflow
      </button>
    </div>
  );
};

export default WorkflowBuilder;
