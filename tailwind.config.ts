import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": '#8AD103',
        "content": '#212121',
        "contentSecondary": '#A6A6A6',
        "disabled": '#ECEFF1',
        "disabledStroke": '#DDE0E5',
        "disabledText": '#CFD8DC',
        "red": '#EF5350',
      }
    },
  },
  plugins: [],
};
export default withMT(config);
