// eslint-disable-next-line no-unused-vars
import React from "react";

const About = () => {
  return (
    <div className="flex justify-center items-center px-6 min-h-screen">
      <div className="p-6 max-w-3xl text-center rounded-lg border border-gray-500 backdrop-blur-md">
        {/* Title */}
        <h1 className="my-6 text-4xl font-bold text-white">About Me</h1>
        <p className="text-lg text-white">
          Welcome to my blog! Here, I share my journey, interests, and
          experiences.
        </p>

        {/* Education */}
        <div className="mt-8 text-left">
          <h2 className="text-2xl font-bold text-white">🎓 Education</h2>
          <p className="mt-2 text-white">
            I moved to Melbourne during high school and studied at{" "}
            <span className="font-medium">Noble Park</span> for three years.
            Later, I completed my{" "}
            <span className="font-medium">Bachelor of Computer Science</span> at{" "}
            <span className="font-medium">Monash University</span>, followed by
            a <span className="font-medium">Master of IT</span> at{" "}
            <span className="font-medium">The University of Melbourne</span>.
          </p>
        </div>

        {/* Career */}
        <div className="mt-8 text-left">
          <h2 className="text-2xl font-bold text-white">💼 Career & Goals</h2>
          <p className="mt-2 text-white">
            Currently, I am actively seeking a front-end or full-stack
            development role. My focus is on modern web technologies, including{" "}
            <span className="font-medium">React, Node.js, and MongoDB</span>. I
            am eager to work in a dynamic team, build impactful projects, and
            continuously grow as a developer.
          </p>
        </div>

        {/* Interests */}
        <div className="mt-8 text-left">
          <h2 className="text-2xl font-bold text-white">🎭 Interests</h2>
          <p className="mt-2 text-white">
            Beyond coding, I am passionate about **fitness** and believe a
            strong mind starts with a strong body. I also enjoy **Texas
            Hold&apos;em Poker**, as it challenges both strategy and psychology.
            In my free time, I love reading, writing, and exploring new
            technologies.
          </p>
        </div>

        {/* Conclusion */}
        <div className="mt-8">
          <p className="text-sm font-semibold">
            Life is an adventure. I embrace every challenge and look forward to
            what&apos;s ahead!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
