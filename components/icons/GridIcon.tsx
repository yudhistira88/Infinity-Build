
import React from 'react';

const GridIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="6.5" cy="6.5" r="2.5" fill="currentColor" stroke="none"/>
        <circle cx="17.5" cy="6.5" r="2.5" fill="currentColor" stroke="none"/>
        <circle cx="6.5" cy="17.5" r="2.5" fill="currentColor" stroke="none"/>
        <circle cx="17.5" cy="17.5" r="2.5" fill="currentColor" stroke="none"/>
    </svg>
);

export default GridIcon;
