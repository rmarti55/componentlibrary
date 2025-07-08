import React from 'react';

interface LogoProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt = 'Brand Logo', width = 40, height = 12, className = '' }) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`object-contain ${className}`}
    style={{ width, height }}
  />
);

export default Logo; 