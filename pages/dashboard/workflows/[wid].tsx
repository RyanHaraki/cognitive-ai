import React, { useState, useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import InputBlock from "@/components/workflow/InputBlock";
import WorkflowAction from "@/components/workflow/WorkflowAction";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

const dummyWorkflow = {
  id: "1",
  name: "Workflow 1",
  description: "Workflow 1 description",
  setup: {
    input: "text",
    prompt: "This is the prompt",
  },
  actions: [
    {
      id: "1",
      type: "text",
      prompt: "This is the prompt",
      emails: [],
      discordWebhookURL: "",
    },
  ],
};

interface Action {
  workflow_id: string;
  action_id: string;
  type: string;
  prompt: string;
  emails: string[];
  discordWebhookURL: string;
}

const Workflow = () => {
  const [workflow, setWorkflow] = useState(null);
  const [actions, setActions] = useState<Action[]>([]);
  const router = useRouter();
  const { isLoaded } = useUser();

  // Fetch workflow data
  useEffect(() => {
    if (isLoaded) {
      const workflow_id = router.query.wid as string;

      fetch("/api/workflows/get/single", {
        method: "POST",
        body: JSON.stringify({ workflow_id: workflow_id }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setWorkflow(data.workflow);
          setActions(data.workflow.actions);
        })
        .catch((err) => console.error(err));
    }
  }, [isLoaded]);

  // Add new action
  const addNewAction = async () => {
    const workflow_id = router.query.wid as string;

    const payload = [
      ...actions,
      {
        workflow_id: workflow_id,
        action_id: uuidv4(),
        type: "text",
        prompt: "",
        emails: [],
        discordWebhookURL: "",
      },
    ];

    setActions(payload);
  };

  // Save workflow
  const saveWorkflow = async () => {
    const workflow_id = router.query.wid as string;

    const payload = {
      workflow_id: workflow_id,
      actions: actions,
    };

    await fetch("/api/workflows/update", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <AppLayout>
      <div className="flex items-start justify-between w-full">
        <div className="mb-16">
          <a
            href="/dashboard"
            className="text-sm text-blue-500 hover:underline cursor-pointer w-fit"
          >
            &larr; Back to Dashboard
          </a>
          <h1 className="font-bold text-3xl">{dummyWorkflow.name}</h1>
          <p className="mt-2 text-gray-600">{dummyWorkflow.description}</p>
        </div>
        <button className="bg-black text-white rounded-md font-medium p-3 text-sm hover:bg-gray-800">
          Integrate Workflow
        </button>
      </div>
      <div className="w-full flex flex-col items-center mb-24">
        {/* Starting Block */}
        <InputBlock
          inputType={dummyWorkflow.setup.input}
          prompt={dummyWorkflow.setup.prompt}
        />

        {/* Action Blocks */}
        {actions?.map((action) => (
          <>
            <div className="w-1 h-24 bg-gray-300 my-4"></div>
            <WorkflowAction />
          </>
        ))}

        <p
          className="hover:underline cursor-pointer mt-2"
          onClick={addNewAction}
        >
          &#43; Add a new block
        </p>

        <button
          onClick={saveWorkflow}
          className="bg-black text-white rounded-md font-medium p-4 max-w-[600px] w-full mt-16 hover:bg-gray-800"
        >
          Save workflow
        </button>
      </div>
    </AppLayout>
  );
};

export default Workflow;
