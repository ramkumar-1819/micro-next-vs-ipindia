/** @type {import('tailwindcss').Config} */
module.exports = {
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
        "satellite-banner":
          "url('https://assets.vakilsearch.com/live-images/website_revamp/yellowbanner.jpg')",
        "gst-Banner":
          "url('https://assets.vakilsearch.com/live-images/website_revamp/incorporation_banner.jpg')",
        "dbs-banner":
          "url('https://assets.vakilsearch.com/live-images/rectangle-bg-banks.svg')",
      },
      lineHeight: {
        1: "1",
        2: "1.5",
        3: "2",
        4: "2.5",
        5: "3",
        6: "3.5",
      },
    },
  },
  plugins: [],
};
