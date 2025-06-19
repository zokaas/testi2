export type T_Option = {
    id: string;
    value: string;
};

export type T_RadioGroup = {
    label: string | React.ReactNode;
    name: string;
    options: T_Option[];
    selectedValue: string;
    onChange: (value: string) => void;
    errorMessage?: string;
};
