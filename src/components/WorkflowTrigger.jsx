import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const WorkflowTrigger = () => {
  const workflows = useSelector((state) => state.workflow.workflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleWorkflowChange = (event) => {
    setSelectedWorkflow(event.target.value);
  };

  const handleSubmit = async () => {
    if (!file || !selectedWorkflow) {
      alert('Please select a workflow and upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('workflowId', selectedWorkflow);

    try {
      const response = await fetch('http://localhost:5000/api/workflows', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error executing workflow:', error);
    }
  };

  return (
    <div className="p-4 px-28 py-28">
      <h1 className="text-3xl font-semibold text-center border-b-2 border-black w-fit mb-4 m-auto py-4">
        Run Workflow Screen
      </h1>
      <div className="border border-dashed border-gray-500 text-center m-auto p-16 w-fit">
        <img
          src="https://www.freeiconspng.com/uploads/upload-icon-3.png"
          alt="uploadFile"
          className='w-fit h-20 m-auto text-center'
        />
        <h1 className="font-small text-gray-500 text-center">
          Drag and Drop files here to upload
        </h1>
        <input type="file" onChange={handleFileChange} className="mb-4 py-8 text-center m-auto" />
      </div>
      <div className="py-6 m-auto w-fit">
        <select
          value={selectedWorkflow}
          onChange={handleWorkflowChange}
          className="p-2 mb-4"
        >
          <option value="">Select Workflow Id</option>
          {workflows.map((wf) => (
            <option key={wf.id} value={wf.id}>
              {wf.id}
            </option>
          ))}
        </select>
        <button
          className="p-2 mx-2 bg-green-500 text-white rounded"
          onClick={handleSubmit}
        >
          Run Workflow
        </button>
      </div>
    </div>
  );
};

export default WorkflowTrigger;
