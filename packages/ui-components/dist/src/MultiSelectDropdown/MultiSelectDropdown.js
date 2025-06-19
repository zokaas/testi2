"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const MultiSelectDropdown = ({ name, label, options, selectedOptions, onChange, errorMessage, placeholder, }) => {
    const [dropdownOpen, setDropdownOpen] = (0, react_1.useState)(false);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const dropdownRef = (0, react_1.useRef)(null);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handleOptionToggle = (optionName) => {
        const newSelectedOptions = selectedOptions.includes(optionName)
            ? selectedOptions.filter((option) => option !== optionName)
            : [...selectedOptions, optionName];
        onChange(newSelectedOptions);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };
    (0, react_1.useEffect)(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex-grow", ref: dropdownRef, children: [(0, jsx_runtime_1.jsx)("label", { className: "block mb-2 font-medium text-base-content", children: label }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full p-2 border border-base-300 bg-base-100 text-base-content rounded-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-2 cursor-pointer", onClick: toggleDropdown, children: (0, jsx_runtime_1.jsx)("span", { className: "block truncate", children: selectedOptions.length > 0
                                ? `${selectedOptions.length} selected`
                                : placeholder }) }), dropdownOpen && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute z-10 w-full bg-base-100 border border-base-300 rounded mt-1 max-h-60 overflow-y-auto", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", className: "sticky top-0 z-10 w-full p-2 border-b border-base-300 bg-base-100", placeholder: "Search...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), options
                                .filter(option => option.value.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((option) => ((0, jsx_runtime_1.jsxs)("label", { className: "flex items-center p-2 hover:bg-base-200 cursor-pointer", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: selectedOptions.includes(option.value), onChange: () => handleOptionToggle(option.value), className: "appearance-none w-4 h-4 border border-base-300 rounded bg-base-100 checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 relative after:content-['\u2713'] after:text-primary-content after:text-xs after:absolute after:inset-0 after:flex after:items-center after:justify-center after:scale-0 checked:after:scale-100 after:transition-transform mr-2" }), option.value] }, option.value)))] }))] }), selectedOptions.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "mb-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-medium text-base-content", children: "Selected:" }), (0, jsx_runtime_1.jsx)("ul", { className: "mt-1", children: options
                            .filter((option) => selectedOptions.includes(option.value))
                            .map((option) => ((0, jsx_runtime_1.jsx)("li", { className: "inline-block mr-2 mt-1 px-2 py-1 bg-base-200 rounded", children: option.value }, option.value))) })] })), errorMessage && ((0, jsx_runtime_1.jsx)("span", { className: "text-red-500 text-sm block", children: errorMessage }))] }));
};
exports.default = MultiSelectDropdown;
