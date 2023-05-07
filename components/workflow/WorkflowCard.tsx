import React from "react";
import { useRouter } from "next/router";

interface Props {
  id: string;
  name: string;
  description: string;
}

const WorkflowCard = ({ id, name, description }: Props) => {
  const router = useRouter();

  return (
    <div
      key={id}
      onClick={() => {
        router.push(`/dashboard/workflows/${id}`);
      }}
      className="hover:bg-gray-50 border border-solid border-gray-200 rounded-md w-full cursor-pointer flex items-center justify-between px-2"
    >
      <div className="m-3 py-2">
        <h3 className="font-bold">{name}</h3>
        <p className="mt-2 text-sm text-gray-600">{description} </p>
      </div>
      <span className="text-lg"> &rarr;</span>
    </div>
  );
};

export default WorkflowCard;
