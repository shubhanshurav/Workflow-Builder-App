// src/components/NodeTypes.js
import React from "react";

const StartNode = () => (
  <div className="p-2 bg-gray-400 rounded">Start</div>
);

const FilterNode = () => (
  <div className="p-2 bg-blue-200 rounded">Filter Data</div>
);

const WaitNode = () => <div className="p-2 bg-yellow-200 rounded">Wait</div>;

const ConvertNode = () => (
  <div className="p-2 bg-green-200 rounded">Convert Format</div>
);

const SendPostNode = () => (
  <div className="p-2 bg-red-200 rounded">Send POST Request</div>
);

const EndNode = () => (
  <div className="p-2 bg-red-400 rounded">End</div>
);

export const nodeTypes = {
  start: StartNode,
  filter: FilterNode,
  wait: WaitNode,
  convert: ConvertNode,
  sendPost: SendPostNode,
  end: EndNode,
};
