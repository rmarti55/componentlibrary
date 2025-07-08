import React from 'react';

interface AvatarThumbProps {
  src: string;
  alt?: string;
  size?: number; // px
  className?: string;
}

const AvatarThumb: React.FC<AvatarThumbProps> = ({ src, alt = '', size = 48, className = '' }) => (
  <img
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={`object-cover rounded ${className}`}
    style={{ width: size, height: size }}
  />
);

export default AvatarThumb; 