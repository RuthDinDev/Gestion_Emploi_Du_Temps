import React from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { TbDatabaseOff } from 'react-icons/tb'; // Icône de base de données désactivée


const NoDataToDisplay = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 rounded-lg">
      {/* Icône d'avertissement */}
      <TbDatabaseOff 
        className="text-9xl text-gray-400 
        hover:text-gray-600 
        transition-colors 
        duration-300"
      />
      {/* Texte principal */}
      <p className="text-gray-500 text-lg font-semibold">Aucune donnée disponible</p>
      {/* Texte secondaire (facultatif) */}
      <p className="text-gray-400 text-sm mt-1">
        Veuillez vérifier plus tard ou ajouter de nouvelle données.
      </p>
    </div>
  );
};

export default NoDataToDisplay;
