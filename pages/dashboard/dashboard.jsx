import React, {useState} from "react";


function Dashboard(){

    return(
        <div className="grow px-4 py-2">
            <div className="p-2 l-0 sm:ml-64">        
              <div className="flex flex-col items-center justify-center bg-slate-700 h-screen">
                    <div className="flex items-center justify-center bg-slate-700 rounded dark:bg-gray-800 p-4 mb-8">
                        <img className="rounded-lg w-12 h-12" src="/images/logoFS.png" alt="Logo" />
                        <p className="text-2xl text-gray-400 dark:text-gray-500 ml-4">
                        Faculté des sciences de l'Université de Ngaoundéré
                        </p>
                    </div>

                    <div className="flex items-center justify-center bg-slate-700 rounded dark:bg-gray-800 p-4">
                        <p className="text-4xl text-white dark:text-gray-500">
                        GESTION DES EMPLOIS DU TEMPS
                        </p>
                    </div>
                </div>
            
        </div>
        </div>
        
    )
}
export default Dashboard;