import { useState, useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import WorkflowCard from "@/components/workflow/WorkflowCard";
import Modal from "@/components/UI/Modal";

interface Workflow {
  workflow_id: string;
  name: string;
  description: string;
}

interface APIKey {
  key: string;
  owner: string;
}

const Dashboard = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [workflows, setWorkflows] = useState([]);
  const [apiKey, setApiKey] = useState<APIKey | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const hiddenApiKey =
    apiKey && apiKey.key.substring(0, 3) + "*".repeat(apiKey.key.length - 3);

  useEffect(() => {
    if (isLoaded) {
      fetch("/api/keys/handle", {
        method: "POST",
        body: JSON.stringify({
          owner: user!.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setApiKey(data.api_key);
        })
        .catch((err) => console.error(err));

      getWorkflows();
    }
  }, [user]);

  const getWorkflows = async () => {
    const res = await fetch(`/api/workflows/get/all`, {
      method: "POST",
      body: JSON.stringify({
        owner_id: user!.id,
      }),
    });

    const data = await res.json().then((data) => {
      setWorkflows(data.workflows);
    });
  };

  return (
    <AppLayout>
      <div className="mb-16">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your dashboard! You can manage all of your workflows from
          here.
        </p>
        <div>
          {apiKey && (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mt-4">
              <strong className="font-bold">API Key: </strong>
              <span className="block sm:inline">
                {showKey ? apiKey.key : hiddenApiKey}
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="ml-2 text-blue-500"
                >
                  {showKey ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(apiKey.key);
                    setModalIsOpen(true);
                    setModalType("COPY_API_KEY");
                  }}
                  className="ml-2 text-blue-500"
                >
                  Copy
                </button>
              </span>
              <p className="text-sm text-gray-600 mt-2">
                This is your API key. You can use this to make requests to the
                API. Please keep this safe.
              </p>
            </div>
          )}
        </div>
      </div>

      <h2 className="font-bold text-xl mb-4">Browse Projects </h2>
      <button
        onClick={() => router.push("/dashboard/workflows/create")}
        className="bg-black text-white rounded-md font-medium p-2"
      >
        Create New Workflow <span className="ml-1">&#43;</span>
      </button>
      <div className="flex flex-col lg:w-1/2 mt-4 space-y-4">
        {workflows.map((workflow: Workflow) => (
          <WorkflowCard
            key={workflow.workflow_id}
            id={workflow.workflow_id}
            name={workflow.name}
            description={workflow.description}
          />
        ))}
      </div>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} type={modalType} />
    </AppLayout>
  );
};

export default Dashboard;
