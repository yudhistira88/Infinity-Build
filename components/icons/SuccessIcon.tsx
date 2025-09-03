import React from 'react';

const SuccessIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`relative ${className || 'w-36 h-36'}`}>
        <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="70" cy="70" r="70" fill="#E0F2FE"/>
            <g transform="translate(25, 25) scale(0.9)">
                <path d="M41.6667 91.6666L35 48.3333L81.6667 35L88.3334 78.3333L41.6667 91.6666Z" fill="#FBBF24"/>
                <path d="M37.8285 49.3333L80.4168 36.3333" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M41.6667 44L37.8285 49.3333" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M80.4167 36.3333L76.5785 41.6667" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M45.0001 40.6667L39.0001 46.6667" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M45 70L58.3333 83.3333L81.6667 60" stroke="#3B82F6" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        </svg>
    </div>
);
export default SuccessIcon;
