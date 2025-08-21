
import React from 'react';

const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.26c-.42.03-.799.34-.845.766l-.396 1.865a1.125 1.125 0 0 1-1.096.807h-8.502a1.125 1.125 0 0 1-1.096-.807l-.396-1.865c-.046-.426-.425-.736-.845-.766l-3.722-.26C3.347 17.1 2.5 16.136 2.5 15v-4.286c0-.97.616-1.813 1.5-2.097l6.5-2.043a1.125 1.125 0 0 1 1 0l6.5 2.043Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 12h17" />
  </svg>
);

export default ChatBubbleLeftRightIcon;
