import LandingLayout from "@/layouts/LandingLayout";

export default function Home() {
  return (
    <LandingLayout>
      <div
        className={`flex flex-col items-center justify-center mt-24 md:p-12`}
      >
        {/* Hero */}
        <div className="flex flex-col items-center md:w-4/5 text-center">
          <h1 className="font-bold text-3xl mb-4">
            Integrate AI Workflows into your App
          </h1>
          <p>
            Create custom AI workflows using an intuitive drag-and-drop
            interface and integrate them in your app via a custom API, or embed
            them into your no-code app.
          </p>
          <div className="flex space-x-4 items-center mt-8">
            <a href="/sign-in">Sign In</a>
            <a
              href="/sign-up"
              className="bg-blue-500 text-white rounded-md py-2 px-3 hover:bg-blue-700 shadow-lg shadow-blue-300 transition-all duration-200"
            >
              Get Started
            </a>
          </div>
          <img
            className="rounded-lg border border-gray-50 shadow-xl m-12 w-full max-w-5xl pointer-events-none"
            src="/image.png"
            alt="landing image"
          />
        </div>
      </div>
    </LandingLayout>
  );
}
