import React from 'react';
import '../index.css'; // Make sure this file exists in the same folder
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const AnimatedStar = styled.svg`
  animation: ${rotate} 6s linear infinite;
  display: inline-block;
`;

const Button = () => {
  return (
    <button className="custom-button" style={{minWidth: "150px"}}>
      <svg
        className="button-icon"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
        height={20}
        width={20}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
      <span className="button-text" style={{marginRight: "-5px"}}>Star on GitHub</span>
      <span className="button-stars">
        <AnimatedStar
          className="star-icon"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          height={20}
          width={20}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </AnimatedStar>
        <span className="star-count">8</span>
      </span>
    </button>
  );
};

export default Button;
