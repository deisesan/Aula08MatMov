import React from 'react';

export default function MatMovLogo({ className = 'h-10', light = false }) {
  return (
    <img
      src="/matmov_logo_white.png"
      alt="MAT MOV"
      className={`object-contain ${className}`}
      onError={(e) => {
        // Fallback if image path not found
        e.target.style.display = 'none';
      }}
    />
  );
}
