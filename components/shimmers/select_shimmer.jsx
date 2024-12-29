import { useState, useEffect } from 'react';

const SelectShimmer = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
    <div className="grid grid-cols-3 gap-4 place-items-center">
      <div className="relative">
        <div className="h-24 w-48 rounded-lg bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse transition-all duration-300 hover:scale-105 hover:shadow-lg" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-gray-500 animate-bounce">Désactivée</span>
      </div>
    </div>
    </div>
  );
};

export default SelectShimmer;
