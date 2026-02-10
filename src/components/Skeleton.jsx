import React from 'react';

const Skeleton = ({ width, height, borderRadius, className = '' }) => {
  const style = {
    width: width || '100%',
    height: height || '20px',
    borderRadius: borderRadius || '12px',
  };

  return (
    <div 
      className={`animate-pulse bg-slate-200 ${className}`} 
      style={style} 
    />
  );
};

export default Skeleton;
