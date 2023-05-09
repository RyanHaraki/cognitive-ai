import React, { useState, useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import InputBlock from "@/components/workflow/InputBlock";
import WorkflowAction from "@/components/workflow/WorkflowAction";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import Modal from "@/components/UI/Modal";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

interface Action {
  workflow_id: string;
  action_id: string;
  type: string;
  prompt: string;
  emails: string[];
  discordWebhookURL: string;
}

const Workflow = () => {
  const [workflow, setWorkflow] = useState<any>(null);
  const [actions, setActions] = useState<Action[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");

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

  // Integrate workflow
  const integrateWorkflow = async () => {
    const workflow_id = router.query.wid as string;

    // copy workflow id to clipboard
    navigator.clipboard.writeText(workflow_id);

    router.push(
      "https://cognitive-ai.readme.io/reference/getting-started-with-your-api-1"
    );
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

    setModalType("SAVE_WORKFLOW");
    setModalIsOpen(true);
  };

  const promptDeleteWorkflow = async () => {
    setModalType("DELETE_WORKFLOW");
    setModalIsOpen(true);
  };

  const deleteWorkflow = async () => {
    const workflow_id = router.query.wid as string;

    await fetch("/api/workflows/delete", {
      method: "POST",
      body: JSON.stringify({ workflow_id: workflow_id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    router.push("/dashboard");
  };

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row items-start justify-between w-full mb-8 md:mb-0">
        <div className="mb-16">
          <a
            href="/dashboard"
            className="text-sm text-blue-500 hover:underline cursor-pointer w-fit"
          >
            &larr; Back to Dashboard
          </a>
          <h1 className="font-bold text-3xl">{workflow?.name}</h1>
          <p className="mt-2 text-gray-600">{workflow?.description}</p>
        </div>
        <div className="md:space-x-2 space-y-2 md:space-y-0 flex flex-col md:flex-row">
          <button
            onClick={() => {
              navigator.clipboard.writeText(router.query.wid as string);
              setModalType("COPY_WORKFLOW_ID");
              setModalIsOpen(true);
            }}
            className="bg-black text-white rounded-md font-medium p-3 text-sm hover:bg-gray-800"
          >
            Copy Workflow ID
            <DocumentDuplicateIcon className="h-5 w-5 ml-2 inline-block" />
          </button>
          <button
            onClick={integrateWorkflow}
            className="bg-black text-white rounded-md font-medium p-3 text-sm hover:bg-gray-800"
          >
            Integrate Workflow
          </button>
          <button
            onClick={promptDeleteWorkflow}
            className="bg-red-600 text-white rounded-md font-medium p-3 text-sm hover:bg-red-700"
          >
            Delete Workflow
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mb-24">
        {/* Starting Block */}
        <InputBlock inputType={workflow?.type} prompt={workflow?.prompt} />

        {/* Action Blocks */}
        {actions?.map((action) => (
          <>
            <div className="w-1 h-24 bg-gray-300 my-4"></div>
            <WorkflowAction
              key={action.action_id}
              id={action.action_id}
              actions={actions}
              setActions={setActions}
              type={action.type}
              prompt={action.prompt}
            />
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
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        primaryFunction={deleteWorkflow}
        type={modalType}
      />
    </AppLayout>
  );
};

export default Workflow;
