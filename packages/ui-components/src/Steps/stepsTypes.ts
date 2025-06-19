export type T_Step = {
    label: string;
    isActive: boolean;
};

export type T_Steps = {
    steps: T_Step[];
    currentStepIndex: number;
};
