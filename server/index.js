// server.js
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const csvParser = require("csv-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;
const { MONGODB_URL } = process.env;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"], 
    allowedHeaders: ["Content-Type"], 
  })
);

  mongoose
    .connect(MONGODB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(console.log(`DB Connection Success`))
    .catch((err) => {
      console.log(`DB Connection Failed`);
      console.log(err);
      process.exit(1);
    });


// Define Mongoose schema and model for workflows
const workflowSchema = new mongoose.Schema({
  id: String,
  nodes: Array,
  edges: Array,
});

const Workflow = mongoose.model("Workflow", workflowSchema);

const upload = multer({ dest: "uploads/" });

// Function to convert CSV data to JSON
const convertCsvToJson = (csvData) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = require("stream");
    const readableStream = new stream.Readable();
    readableStream._read = () => {};
    readableStream.push(csvData);
    readableStream.push(null);

    readableStream
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};

// Function to handle filtering data
const filterData = (data) => {
  return data.map((row) => {
    const filteredRow = {};
    for (const key in row) {
      filteredRow[key.toLowerCase()] = row[key].toLowerCase();
    }
    return filteredRow;
  });
};

// Function to handle delay (Wait node)
const wait = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// Function to handle sending POST requests
const sendPostRequest = async (jsonData) => {
  const response = await axios.post("https://requestcatcher.com", jsonData);
  return response.data;
};

// Function to execute workflow nodes
const executeWorkflow = async (workflow, jsonData) => {
  for (const node of workflow.nodes) {
    const { type } = node;

    switch (type) {
      case "filter":
        jsonData = filterData(jsonData);
        break;
      case "wait":
        await wait(2000); // Example: wait for 2 seconds
        break;
      case "convert":
        // Conversion is already done during CSV to JSON conversion
        break;
      case "sendPost":
        const response = await sendPostRequest(jsonData);
        return response;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  }

  return jsonData; // Return the final processed data
};

// Route to save a new workflow
app.post("/api/workflows", async (req, res) => {
  const workflowData = req.body;
  console.log(workflowData)

  try {
    const workflow = new Workflow(workflowData);
    await workflow.save();
    res
      .status(201)
      .json({ success: true, message: "Workflow saved successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to save workflow",
        error: error.message,
      });
  }
});

// Route to execute a workflow
app.post("/api/execute-workflow", upload.single("file"), async (req, res) => {
  const { workflowId } = req.body;
  const filePath = req.file.path;

  try {
    const workflow = await Workflow.findOne({ id: workflowId });
    if (!workflow) {
      return res
        .status(404)
        .json({ success: false, message: "Workflow not found" });
    }

    const csvData = fs.readFileSync(filePath, "utf-8");
    const jsonData = await convertCsvToJson(csvData);

    const result = await executeWorkflow(workflow, jsonData);

    res.status(200).json({
      success: true,
      message: "Workflow executed successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Workflow execution failed",
      error: error.message,
    });
  } finally {
    fs.unlinkSync(filePath); // Delete the uploaded file after processing
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
