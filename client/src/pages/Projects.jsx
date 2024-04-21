import React from "react";

import CallToAction from "../components/CallToAction";
const Projects = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl min-h-screen gap-6 p-3 mx-auto">
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="text-gray-500 text-md">
        My portfolio contains all my projects{" "}
      </p>
      <CallToAction />
    </div>
  );
};

export default Projects;
