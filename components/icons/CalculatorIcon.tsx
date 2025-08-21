
import React from 'react';

const CalculatorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562l.259-1.035a3.375 3.375 0 00-2.456-2.456l-1.035-.259L12 18l.259 1.035a3.375 3.375 0 002.456 2.456l1.035.259L16.898 23l-.259-1.035a3.375 3.375 0 00-2.456-2.456L12 19.5l1.036.259a3.375 3.375 0 002.455 2.456l1.156.287z" />
  </svg>
);

export default CalculatorIcon;
