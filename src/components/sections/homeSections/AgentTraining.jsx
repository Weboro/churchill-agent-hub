import Link from "next/link";

const AgentTraining = () => {
  return (
    <div className="container-blog mx-auto px-5">
      <div className="w-full border-l-4 border-orange-500 bg-orange-50 p-10 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between mx-auto">
        <div className="sm:flex-1">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Complete the Education Agent Induction Course
          </h2>
          <p className="text-sm text-gray-600 italic">
            -20-minute video + handbook + short quiz
          </p>
        </div>
        <Link
          href="/agent-induction-course"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mt-4 sm:mt-0"
        >
          Start/Continue{" "}
          <i className="fi fi-rr-arrow-small-right m-0 p-0 flex"></i>
        </Link>
      </div>
    </div>
  );
};

export default AgentTraining;
