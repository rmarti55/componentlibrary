import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const classes = `bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${className}`;

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;