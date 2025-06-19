"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Select = ({ name, label, options, selectedValue, onChange, errorMessage, placeholder = "Choose an option", }) => {
    const [dropdownOpen, setDropdownOpen] = (0, react_1.useState)(false);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const dropdownRef = (0, react_1.useRef)(null);
    const handleOptionClick = (option) => {
        onChange(option.value);
        setDropdownOpen(false);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };
    (0, react_1.useEffect)(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const filteredOptions = options && options.length > 15
        ? options.filter((option) => option.value.toLowerCase().includes(searchTerm.toLowerCase()))
        : options || [];
    const selectedOption = options?.find((option) => option.value === selectedValue);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex-grow", children: [(0, jsx_runtime_1.jsx)("label", { className: "block mb-2 font-medium text-base-content", children: label }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", ref: dropdownRef, children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full px-3 py-3 border border-base-300 bg-base-100 text-base-content", onClick: (e) => {
                            e.stopPropagation();
                            setDropdownOpen(!dropdownOpen);
                        }, children: (0, jsx_runtime_1.jsx)("span", { className: "block truncate", children: selectedOption ? selectedOption.value : placeholder }) }), dropdownOpen && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute z-10 w-full bg-base-100 border border-base-300 mt-1 max-h-60 overflow-y-auto text-base-content shadow-lg", children: [options && options.length > 15 && ((0, jsx_runtime_1.jsx)("div", { className: "sticky top-0 z-10 border border-base-300 bg-base-100", children: (0, jsx_runtime_1.jsx)("input", { name: name, type: "text", className: "w-full px-3 py-3 bg-transparent focus:outline-none", placeholder: "Search...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), onClick: (e) => e.stopPropagation() }) })), filteredOptions.map((option, index) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center px-3 py-3 hover:bg-base-200 cursor-pointer text-base-content transition-colors duration-150", onClick: (e) => {
                                            e.stopPropagation();
                                            handleOptionClick(option);
                                        }, children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate", children: option.value }), selectedValue === option.value] }), index < filteredOptions.length - 1 && ((0, jsx_runtime_1.jsx)("div", { className: "border border-base-300 mb-2" }))] }, option.value)))] }))] }), errorMessage && ((0, jsx_runtime_1.jsx)("span", { className: "text-red-500 text-sm block mt-1", children: errorMessage }))] }));
};
exports.default = Select;
