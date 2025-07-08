import React from 'react';

interface StarIconProps {
  filled?: boolean;
  className?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ filled = true, className = '' }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
    />
  </svg>
);

export default StarIcon; 