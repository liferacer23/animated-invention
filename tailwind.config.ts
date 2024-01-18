import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        smx: "0px 2px 4px 0px rgba(55, 73, 87, 0.05)",
      },
      colors: {
        greenify: "rgba(61, 194, 147, 1)",
        grayish: "#383D4E",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-green":
          "linear-gradient(268deg, rgba(48, 153, 117, 0.80) 53.65%, rgba(71, 70, 76, 1) 100%)",
        "gradient-green-reverse":
          "linear-gradient(90deg, rgba(48, 153, 117, 0.80) 53.65%, rgba(71, 70, 76, 1) 100%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
