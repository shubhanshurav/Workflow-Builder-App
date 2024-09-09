// src/store/workflowSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workflows: [],
};

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    addWorkflow: (state, action) => {
      state.workflows.push(action.payload);
    },
    updateWorkflow: (state, action) => {
      const index = state.workflows.findIndex(
        (wf) => wf.id === action.payload.id
      );
      if (index !== -1) {
        state.workflows[index] = action.payload;
      }
    },
  },
});

export const { addWorkflow, updateWorkflow } = workflowSlice.actions;
export default workflowSlice.reducer;
