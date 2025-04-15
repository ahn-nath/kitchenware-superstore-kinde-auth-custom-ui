import React from 'react';

export default function Loading() {
  // You can customize this loader as needed
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
}