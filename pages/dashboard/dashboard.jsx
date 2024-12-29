import React, {useState} from "react";


function Dashboard(){

    return(
        <div className="grow rounded-lg sm:ml-64">
            {/* <div className="p-2 l-0 "> */}
              <div className="flex flex-col items-center justify-center gap-y-8 w-full h-full rounded-lg bg-[#002157]">
                    <div className="flex items-center justify-center bg-[#002157] rounded dark:bg-gray-800 p-4 mb-8">
                        <img className="relative w-10 h-10" src="/images/logoFS.png" alt="Logo" />
                        <p className="text-2xl text-gray-400 dark:text-gray-500 ml-4">
                        Faculté des sciences de l'Université de Ngaoundéré
                        </p>
                    </div>
                    <strong className="text-8xl text-white">FS-SCHEDULE</strong>
                    
                    

                    <div className="flex items-center justify-center bg-[#002157] rounded dark:bg-gray-800 p-4">
                        <p className="text-4xl text-white dark:text-gray-500">
                        GESTION DES EMPLOIS DU TEMPS
                        </p>
                    </div>
                </div>
            
        {/* </div> */}
        </div>
        
    )
}
export default Dashboard;