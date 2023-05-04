import { useUser } from "@clerk/nextjs";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
const dummyProjects = [
  {
    id: "1",
    name: "Project 1",
    description: "Project 1 description",
  },
];

const Dashboard = () => {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="mb-16">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <p>Project Description</p>
      </div>

      <h2 className="font-bold text-xl mb-4">Browse Projects</h2>
      <div className="grid gap-4 grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 w-fit">
        {dummyProjects.map((project) => (
          <div
            onClick={() => {
              router.push(`/dashboard/${project.id}`);
            }}
            className="hover:bg-gray-50 border border-solid borer-gray-200 rounded-md w-fit cursor-pointer"
          >
            <img
              src="https://help.figma.com/hc/article_attachments/360067693934/Screen_Shot_2020-04-27_at_11.30.18_AM.png"
              alt="workflow image"
              className="h-48 w-full object-cover rounded-t-md"
            />
            <div className="m-3 py-2 border-t border-solid border-gray-200">
              <h3 className="font-bold">{project.name}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
