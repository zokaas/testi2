"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Header = ({ title }) => {
    const fallbackLogo = "/logos/t.svg";
    const [logoSrc, setLogoSrc] = (0, react_1.useState)(fallbackLogo);
    (0, react_1.useEffect)(() => {
        const theme = document.documentElement.getAttribute("data-theme");
        if (theme) {
            setLogoSrc(`/logos/t.svg`);
        }
    }, []);
    return ((0, jsx_runtime_1.jsx)("header", { className: "w-full min-h-[76px] bg-base-100 shadow-strong z-10 relative", children: (0, jsx_runtime_1.jsxs)("div", { className: "h-full w-full max-w-[976px] mx-auto px-4 md:px-6 flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0", children: (0, jsx_runtime_1.jsx)("img", { src: logoSrc, alt: "Logo", onError: () => setLogoSrc(fallbackLogo), className: "h-12 w-auto object-contain" }) }), title && ((0, jsx_runtime_1.jsx)("h1", { className: "text-lg md:text-xl lg:text-2xl font-semibold text-base-content ml-4", children: title }))] }) }));
};
exports.default = Header;
