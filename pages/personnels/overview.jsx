import React, {useState} from "react";
import { RiSearch2Line } from "react-icons/ri";
import { FaSortDown ,FaPlus, FaSort, FaFilter, FaPrint } from "react-icons/fa";
import NoDataToDisplay from "@/components/generals/no_data_display";
import AlertModal from "@/components/modal/alert_modal";



function EnseignantPage(){

    const [stateSearchBar, setStateSearchBar] = useState(false);
        const toggleShowSearchBar = () =>{
            setStateSearchBar(prevState => !prevState);
        }
        
        const [data, setData] = useState([
            { idEnseignant: 1, nameEnseignant: "YOUSSOUFA NJUPUEN", matricule: "MAT123", roleEnseignant: "Manager" },
            { idEnseignant: 2, nameEnseignant: "YOUSSOUFA NJUPUEN", matricule: "MAT456", roleEnseignant: "Developer" },
            { idEnseignant: 3, nameEnseignant: "YOUSSOUFA NJUPUEN", matricule: "MAT789", roleEnseignant: "Designer" },
            { idEnseignant: 1, nameEnseignant: "YOUSSOUFA NJUPUEN", matricule: "MAT123", roleEnseignant: "Manager" },
            { idEnseignant: 2, nameEnseignant: "YOUSSOUFA NJUPUEN", matricule: "MAT456", roleEnseignant: "Developer" },
            { idEnseignant: 3, nameEnseignant: "YOUSSOUFA NJUPUEN", matricule: "MAT789", roleEnseignant: "Designer" },
            // { idEnseignant: 1, nameEnseignant: "YOUSSOUFA NJUPUEN", matricule: "MAT123", roleEnseignant: "Manager" },
            // { idEnseignant: 2, nameEnseignant: "YOUSSOUFA NJUPUEN", matricule: "MAT456", roleEnseignant: "Developer" },
            // { idEnseignant: 3, nameEnseignant: "YOUSSOUFA NJUPUEN", matricule: "MAT789", roleEnseignant: "Designer" },
          ]);

    return(
        <div className="p-2 l-0 border-black sm:ml-64">
            {/* titre de la page */}
        <title>Home | Enseignant</title>

            <div className="flex flex-col gap-y-4">
                {/* Head cotenant les option de Enseignant */}
                <div className="bg-gray-200 w-screen p-2 left-0 flex flex-row justify-betwen ">
                    <div className="flex items-center"><h2 className="text-xl ">LISTE DES EnseignantS  </h2>
                        {/*barre de treherche*/}
                        <div className="flex items-center pl-5 mx-auto"> 
                            {stateSearchBar? 
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <RiSearch2Line />
                                </div>
                            <input  className="bg-gray-300 w-64 text-gray-900 text-sm rounded-lg outline-none ps-10 p-2.5  " placeholder="Search ..."  />
                        </div>: null}
                        <div onClick={toggleShowSearchBar} className="p-2.5 ms-3 mr-3 text-sm font-medium text-black  rounded-lg bg-gray-300 hover:bg-white  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </div>
                    </div>
                    </div>
                    <button type="button" className="flex items-center w-24 text-white bg-blue-700 hover:text-white hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm my-2 px-2 py-2 text-center inline-flex me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                        <FaPlus className="mr-1" />
                        Ajouter
                    </button>
                    <button type="button" className="flex items-center w-24 text-gray-700 bg-white hover:text-black border border-gray-200 hover:bg-gray-200 focus:ring-blue-300 font-medium rounded-lg text-sm my-2 px-2 py-2 text-center inline-flex me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                        <FaFilter className="mr-1" />
                        Filtrer
                    </button>
                    <button type="button" className="flex items-center w-24 text-gray-700 bg-white hover:text-black border border-gray-200 hover:bg-gray-200 focus:ring-blue-300 font-medium rounded-lg text-sm my-2 px-2 py-2 text-center inline-flex me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                        <FaSort className="mr-1" />
                        Trier
                    </button>
                    <button type="button" className="flex items-center w-24 text-white bg-yellow-400 hover:text-black border border-gray-200 hover:bg-gray-200 focus:ring-blue-300 font-medium rounded-lg text-sm my-2 px-2 py-2 text-center inline-flex me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                        <FaPrint className="mr-1" />
                        Imprimer
                    </button>
                </div>
                {/* liste des Enseignants */}
                {/* <h2 className="text-xl font-semibold ">LISTE DES EnseignantS</h2> */}
                <div className="p-0">
                    {data.length === 0 ? (
                        <NoDataToDisplay />
                    ) : (
                        
                        <div className="bg-gray-200 shadow rounded-lg">
                            {/* <AlertModal/> */}
                        {/* En-tête */}
                        <div className="bg-gray-100 text-gray-800 font-semibold flex justify-between py-2 px-4 rounded-t-lg">
                            <p className="w-1/3">Noms</p>
                            <p className="w-1/3">Matricule</p>
                            <p className="w-1/3">Rôle(s)</p>
                        </div>

                        {/* Liste */}
                        <ul className="divide-y divide-gray-100">
                            {data.map((Enseignant) => (
                            <li
                                key={Enseignant.idEnseignant}
                                className="flex justify-between bg-white items-center transition-75 py-2 px-4 hover:bg-gray-100"
                            >
                                <p className="w-1/3 text-lg text-gray-800">
                                {Enseignant.nameEnseignant}
                                </p>
                                <p className="w-1/3 text-lg text-gray-500">
                                {Enseignant.matricule}
                                </p>
                                <p className="w-1/3 text-lg text-gray-500">
                                {Enseignant.roleEnseignant}
                                </p>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    </div>



            </div>
            
        </div>
    )
}
export default EnseignantPage;