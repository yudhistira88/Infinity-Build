
import React from 'react';

const LifebuoyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm0 0a8.949 8.949 0 0 0 4.95-1.708l-1.824-1.824a6.75 6.75 0 0 0-6.252 0l-1.824 1.824A8.949 8.949 0 0 0 12 21Zm-4.95-3.536 1.824-1.824a6.75 6.75 0 0 0 0-6.252L7.05 7.05a8.949 8.949 0 0 0 0 9.904Zm9.9 0a8.949 8.949 0 0 0 0-9.904l-1.824 1.824a6.75 6.75 0 0 0 0 6.252l1.824 1.824ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  </svg>
);

export default LifebuoyIcon;
