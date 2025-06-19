export type T_Option = {
    id: string;
    value: string;
};

export type T_Select = {
    name: string;
    label: string | React.ReactNode;
    options?: T_Option[];
    selectedValue: string;
    onChange: (value: string) => void;
    errorMessage?: string;
    placeholder?: string;
};
