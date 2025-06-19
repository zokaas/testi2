"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const regular_1 = require("@awesome.me/kit-60ea292f8c/icons/classic/regular");
const Tooltip = ({ content, className = "" }) => {
    const [visible, setVisible] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)("div", { className: `relative inline-block ${className}`, onMouseEnter: () => setVisible(true), onMouseLeave: () => setVisible(false), tabIndex: 0, children: [(0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: regular_1.faQuestionCircle, className: "text-black cursor-pointer text-xl" }), visible && ((0, jsx_runtime_1.jsx)("div", { className: `absolute z-10 bg-white text-black p-2 border border-gray-300 shadow min-w-64 max-w-[600px] md:max-w-[800px] whitespace-normal break-normal left-1/2 transform -translate-x-1/2`, children: content }))] }));
};
exports.default = Tooltip;
