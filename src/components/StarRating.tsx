import React from 'react';
import StarIcon from './StarIcon';

function getRelativeDate(date: Date | string | undefined | null): string {
  if (!date) return 'Unknown date';
  let d: Date;
  if (typeof date === 'string') {
    d = new Date(date);
    if (isNaN(d.getTime())) return 'Unknown date';
  } else if (date instanceof Date) {
    if (isNaN(date.getTime())) return 'Unknown date';
    d = date;
  } else {
    return 'Unknown date';
  }
  const now = new Date();
  const diff = (now.getTime() - d.getTime()) / 1000;
  if (diff < 60 * 60) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 60 * 60 * 24) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 60 * 60 * 24 * 30) return `${Math.floor(diff / (3600 * 24))} days ago`;
  if (diff < 60 * 60 * 24 * 365) return `${Math.floor(diff / (3600 * 24 * 30))} months ago`;
  return `${Math.floor(diff / (3600 * 24 * 365))} years ago`;
}

interface StarRatingProps {
  rating: number; // e.g. 4.5
  date: Date | string;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, date, className = '' }) => {
  // Clamp rating between 0 and 5
  const safeRating = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(safeRating);
  const partial = safeRating % 1;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <StarIcon key={i} filled className="text-yellow-400 w-5 h-5" />;
          } else if (i === fullStars && partial > 0) {
            // Render a partially filled star using SVG mask
            return (
              <span key={i} className="relative w-5 h-5 block">
                <StarIcon filled className="text-yellow-400 absolute left-0 top-0 w-5 h-5" style={{ clipPath: `inset(0 ${100 - partial * 100}% 0 0)` }} />
                <StarIcon filled={false} className="text-yellow-400 w-5 h-5" />
              </span>
            );
          } else {
            return <StarIcon key={i} filled={false} className="text-yellow-400 w-5 h-5" />;
          }
        })}
      </div>
      <span className="text-xs text-black ml-2">{getRelativeDate(date)}</span>
    </div>
  );
};

export default StarRating; 