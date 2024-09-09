import React from 'react';
import WorkflowBuilder from './components/WorkflowBuilder';
import WorkflowTrigger from './components/WorkflowTrigger';

const App = () => {
  return (
      <div className="App">
        <WorkflowBuilder />
        <WorkflowTrigger />
      </div>
  );
};

export default App;

