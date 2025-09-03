import React from 'react';

const BuildingLibraryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth={0.2}>
      <rect x="8" y="4" width="4" height="16" rx="1" />
      <rect x="13" y="10" width="4" height="10" rx="1" />
    </svg>
);

export default BuildingLibraryIcon;
