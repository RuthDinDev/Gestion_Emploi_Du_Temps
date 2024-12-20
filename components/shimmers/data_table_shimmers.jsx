import React from 'react';

const DataTableShimmer = () => {
  // Simule 5 colonnes et 6 lignes
  const columns = [1, 2, 3];
  const rows = [1, 2, 3, 4, 5, 6];

  return (
    <div className="bg-gray-200 shadow rounded-lg">
      {/* En-tête shimmer */}
      <div className="bg-gray-100 flex justify-between  m-2 py-2 px-4 rounded-t-lg">
        {columns.map((_, index) => (
          <div 
            key={index} 
            className="w-1/3 h-6 mx-10 rounded bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 animate-pulse"
          />
        ))}
      </div>

      {/* Liste shimmer */}
      <ul className="divide-y divide-gray-100">
        {rows.map((_, rowIndex) => (
          <li
            key={rowIndex}
            className="flex justify-between bg-white items-center py-2 px-4"
          >
            {columns.map((_, colIndex) => (
              <div
                key={colIndex}
                className="w-1/3 mx-4 h-8 rounded bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-pulse"
              />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataTableShimmer;