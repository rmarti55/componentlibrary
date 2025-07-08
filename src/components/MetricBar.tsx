import React from 'react';

interface MetricBarProps {
  value: number; // e.g., 3
  max?: number; // e.g., 5
  color?: string; // e.g., '#f0bf9b'
  bgColor?: string; // e.g., '#d7d8e0'
  className?: string;
}

const MetricBar: React.FC<MetricBarProps> = ({
  value,
  max = 5,
  color = '#f0bf9b',
  bgColor = '#d7d8e0',
  className = '',
}) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 w-12 rounded"
          style={{ background: i < value ? color : bgColor }}
        />
      ))}
    </div>
  );
};

export default MetricBar; 