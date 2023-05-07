import React, { useEffect, useState } from "react";

interface Props {
  inputType: string;
  prompt: string;
}

const InputBlock = ({ inputType, prompt }: Props) => {
  const [workflowPrompt, setWorkflowPrompt] = useState("");
  const [workflowInputType, setWorkflowInputType] = useState("");

  useEffect(() => {
    setWorkflowInputType(inputType);
    setWorkflowPrompt(prompt);
  }, []);

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 max-w-[600px] w-full">
      <div className="mb-4 border-b border-gray-200 border-solid">
        <h2 className="font-medium text-2xl">Input Block</h2>
        <p className="text-gray-500 mb-2 text-sm">Setup your Bot</p>
      </div>
      <div className="mb-4">
        <p>Input</p>
        <p className="text-gray-500 mb-2 text-sm">
          Select the input type you want to use for your workflow
        </p>
        <select
          value={workflowInputType}
          onChange={(e) => setWorkflowInputType(e.target.value)}
          className="p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
      </div>
      {/* Workflow Prompt */}
      <div>
        <p>Workflow Prompt</p>
        <p className="text-gray-500 mb-2 text-sm">
          The following prompt will define the behavior of your workflow
        </p>
        <textarea
          value={workflowPrompt}
          onChange={(e) => setWorkflowPrompt(e.target.value)}
          className="w-full h-24 p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm"
        ></textarea>
        {/* <button className="bg-black text-white rounded-md font-medium px-4 py-1.5 ">
          Save
        </button> */}
      </div>
    </div>
  );
};

export default InputBlock;
