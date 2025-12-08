import React from 'react';

export interface StepData {
    id: string;
    instruction: React.ReactNode;
    details: React.ReactNode;
}

export interface StepsConfig {
    mobile: StepData[];
    desktop: StepData[];
}
