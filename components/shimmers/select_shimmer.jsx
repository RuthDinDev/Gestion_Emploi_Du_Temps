import { useState, useEffect } from 'react';

const DataTableShimmer = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {[...Array(5)].map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="contents">
            {[...Array(3)].map((_, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="h-24 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTableShimmer;
