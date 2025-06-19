import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "../../packages/**/src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "blue-gradient":
                    "linear-gradient(to bottom, rgb(38, 158, 245) -14%, rgb(38, 79, 133) 114%)",
                "green-gradient": "linear-gradient(to bottom, #a8e0a1 -5%, #4caf50 114%)",
                "red-gradient": "linear-gradient(to bottom, #ff4d4d 60%, #cc0000 114%)",
            },
            fontFamily: {
                sans: ["Open Sans", "sans-serif"],
            },
            fontSize: {
                xxxl: "28px",
                xxl: "24px",
                xl: "18px",
                l: "16px",
                m: "15px",
                s: "14px",
                xs: "13px",
                xxs: "12px",
            },
            fontWeight: {
                normal: "400",
                bold: "600",
                chunky: "700",
            },
            boxShadow: {
                strong: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
            },
            borderRadius: {
                l: "12px",
                m: "5px",
                s: "2px",
            },
            screens: {
                mobile: "786px",
                desktop: "1080px",
            },
        },
    },
    plugins: [],
};

export default config;
