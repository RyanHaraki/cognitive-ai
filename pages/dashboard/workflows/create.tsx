import AppLayout from "@/layouts/AppLayout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

const Create = () => {
  const router = useRouter();
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const { user } = useUser();

  const handleCreateNewWorkflow = async () => {
    if (workflowName === "" || workflowDescription === "") {
      return;
    }

    const res = await fetch("/api/workflows/create", {
      method: "POST",
      body: JSON.stringify({
        owner_id: user!.id,
        name: workflowName,
        description: workflowDescription,
      }),
    });

    const data = await res.json().then((data) => {
      console.log(data);
      router.push(`/dashboard/workflows/${data.workflow_id}`);
    });
  };

  return (
    <AppLayout>
      <div className="mb-16">
        <a
          href="/dashboard"
          className="text-sm text-blue-500 hover:underline cursor-pointer w-fit"
        >
          &larr; Back to Dashboard
        </a>
        <h1 className="font-bold text-3xl">Create New Workflow</h1>
        <p className="mt-2 text-gray-600">
          Create a new workflow to generate text, images, or fine-tune images.
        </p>
      </div>

      <div className="w-full flex flex-col items-center mb-24">
        <div className="border-2 border-gray-300 rounded-lg p-4 max-w-[600px] w-full">
          <div className="mb-4 border-b border-gray-200 border-solid">
            <h2 className="font-medium text-2xl">Setup</h2>
            <p className="text-gray-500 mb-2 text-sm">
              Configure your workflow
            </p>
          </div>
          <div>
            <p>Workflow Name</p>
            <input
              onChange={(e) => setWorkflowName(e.target.value)}
              type="text"
              className="p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm w-full"
            />
          </div>
          <div className="mt-4">
            <p className="mb-2">Workflow Description</p>
            <textarea
              onChange={(e) => setWorkflowDescription(e.target.value)}
              className="p-2 rounded-md shadow-sm border border-solid border-gray-200 text-sm w-full"
              rows={5}
            ></textarea>
          </div>
          <button
            onClick={handleCreateNewWorkflow}
            className="mt-4 bg-black text-white rounded-md px-4 py-2"
          >
            Create Workflow
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Create;
