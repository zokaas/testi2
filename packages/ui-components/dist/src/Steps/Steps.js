"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Steps = ({ steps, currentStepIndex }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full max-w-2xl px-4 mb-8 mx-auto", children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between w-full", children: steps.map((_, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const isActive = isCompleted || isCurrent;
                const isLast = index === steps.length - 1;
                return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: `w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all
                  ${isCompleted
                                        ? "bg-green-500 text-white border-green-500"
                                        : isCurrent
                                            ? "bg-indigo-500 text-white border-indigo-500"
                                            : "bg-gray-200 text-gray-500 border-gray-300"}`, children: isCompleted ? "✓" : index + 1 }), (0, jsx_runtime_1.jsx)("span", { className: `mt-2 text-sm ${isActive ? "text-black font-medium" : "text-gray-400"}`, children: steps[index].label })] }), !isLast && ((0, jsx_runtime_1.jsx)("div", { className: "flex-1 h-1 mx-2", children: (0, jsx_runtime_1.jsx)("div", { className: `h-1 w-full rounded-full transition-all duration-300 ${currentStepIndex > index
                                    ? "bg-indigo-500"
                                    : "bg-gray-300"}` }) }))] }, index));
            }) }) }));
};
exports.default = Steps;
