# Workflow Builder

<img src="https://github.com/user-attachments/assets/495e2b75-7432-46f0-9d88-587d5a13a01f" alt="1" width="500" height="400">


## Overview

Workflow Builder is a web application that allows users to create, visualize, and execute workflows through a graphical interface. It utilizes **React.js** with **ReactFlow** for the frontend and **Node.js** with **Express.js** for the backend. The workflows can be saved, retrieved, and executed using defined tasks, such as filtering data, waiting, converting data formats, and sending HTTP requests.

## Features

- **Drag-and-Drop Interface:** Allows users to build workflows by dragging and connecting nodes.
- **Custom Nodes:** Includes nodes like Start, Filter, Wait, Convert, and Send POST Request.
- **Save and Load Workflows:** Save workflows to a database and load previously saved workflows.
- **Execute Workflows:** The backend processes the workflow and executes tasks in the defined order.
- **Visual Feedback:** Provides real-time visual feedback to indicate the execution of workflow steps.

## Technology Stack

- **Frontend:**
  - React.js
  - ReactFlow
  - Redux (for state management)
  - Tailwind CSS (for styling)

- **Backend:**
  - Node.js
  - Express.js
  - Multer (for file uploads)
  - Axios (for making HTTP requests)
  - MongoDB  (for storing workflow data)

- **File Structure:**
  
![image](https://github.com/user-attachments/assets/3cacad71-a2eb-4a39-8cf1-4650b9c694c2)


## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/workflow-builder.git
cd workflow-builder
