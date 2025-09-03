import React from 'react';

type Step = 'pesan' | 'bayar' | 'selesai';

interface SurveyStepperProps {
    currentStep: Step;
}

const steps: { id: Step, title: string, number: number }[] = [
    { id: 'pesan', title: 'Pesan', number: 1 },
    { id: 'bayar', title: 'Bayar', number: 2 },
    { id: 'selesai', title: 'Selesai', number: 3 },
];

const SurveyStepper: React.FC<SurveyStepperProps> = ({ currentStep }) => {
    const currentStepIndex = steps.findIndex(step => step.id === currentStep);

    return (
        <div className="px-4 pt-6 pb-2">
            <div className="flex items-center">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className="flex items-center">
                            <div className={`rounded-full transition duration-500 ease-in-out h-8 w-8 border-2 flex items-center justify-center flex-shrink-0 ${
                                index <= currentStepIndex ? 'bg-blue-800 border-blue-800 text-white' : 'border-slate-300 text-slate-500'
                            }`}>
                                <span className="font-bold text-sm">{step.number}</span>
                            </div>
                            <div className={`ml-3 text-sm ${
                                index <= currentStepIndex ? 'text-blue-800 font-semibold' : 'text-slate-500'
                            }`}>{step.title}</div>
                        </div>
                        {index < steps.length - 1 && (
                             <div className={`flex-auto border-t-2 transition duration-500 ease-in-out mx-4 ${
                                index < currentStepIndex ? 'border-blue-800' : 'border-slate-300'
                            }`}></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default SurveyStepper;