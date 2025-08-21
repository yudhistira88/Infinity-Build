
import React from 'react';

const AtSymbolIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-2.625-2.017-4.75-4.5-4.75S10.5 9.375 10.5 12s2.017 4.75 4.5 4.75S19.5 14.625 19.5 12Z" />
  </svg>
);

export default AtSymbolIcon;
