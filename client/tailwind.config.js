const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    require("tailwind-scrollbar"),
    // As of Tailwind CSS v3.3, the `@tailwindcss/line-clamp` plugin is now included by default.
  ],
};
