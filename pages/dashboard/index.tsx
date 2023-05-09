import { useState, useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import WorkflowCard from "@/components/workflow/WorkflowCard";

interface Workflow {
  workflow_id: string;
  name: string;
  description: string;
}

const Dashboard = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    if (isLoaded) {
      console.log("user loaded");
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
    </AppLayout>
  );
};

export default Dashboard;
