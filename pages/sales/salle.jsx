import React, {useState, useEffect} from "react";
// impost des icones
import { RiSearch2Line } from "react-icons/ri";
import { FaSortDown ,FaPlus, FaSort, FaFilter, FaPrint } from "react-icons/fa";

// importation des composants
import NoDataToDisplay from "@/components/generals/no_data_display";
import AlertModal from "@/components/modal/alert_modal";
import DataTable from "@/components/generals/table_Data";
import DetailModal from "@/components/modal/detail_modal";
import DataTableShimmer from "@/components/shimmers/data_table_shimmers";

// import des servives
import { Salle } from "@/services/salle.services";
import Toast from "@/components/generals/toast_message";
import SalleAddModal from "@/components/salles/add_salle_modal";



function SallePage(){
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [stateSearchBar, setStateSearchBar] = useState(false);
    const [toast, setToast] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedSalle, setSelectedSalle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [salleData, setSalleData] = useState([]);

    const showToast = (message, color) => {
        setToast({ message, color });
        setTimeout(() => setToast(null), 5000);
    };

    const toggleShowSearchBar = () =>{
        setStateSearchBar(prevState => !prevState);
    }

    const handleRowClick =(salle) =>{
        setSelectedSalle(salle);
        setModalOpen(true);
    }

    const handleAddSalle = async(newSalle) => {
        try {
            const response = await Salle.createSalle(newSalle);
            showToast("Enseignat ajoute avec succès !", "green")
            setSalleData([... salleData, response]);
        } catch (error) {
            showToast(`${error.response.data.error}`, "red");
        }
    }
    // suppression de 
    const handeleDeletedSalle = async(idSalle) =>{
        try {
            await Salle.deleteSalle(idSalle);
            setSalleData(prevSalleData =>
                prevSalleData.filter(salle => salle.idSalle !== idSalle)
              );
              showToast(`Salle supprimé avec succès !`,"green");
            setSalleData([... salleData, response]);
            
        } catch (error) {
            // console.log("wwwwwww ",id);
            // showToast(`${error.response.data.error}`, "red");
        }
    }

    useEffect(() => {
        const fetchSalle = async () => {
            try {
                const salles = await Salle.getAllSalles();
                setSalleData(salles);
                setTimeout( () =>{
                    setIsLoading(false);
                },1000);
            } catch (error) {
                console.error("Erreur lors de la récupération des données des salles :", error);
            }
        };
        fetchSalle();
    }, []);
                
    return(
        <div className="p-2 l-0 border-black sm:ml-64">
            {/* titre de la page */}
        <title>Home | Salle</title>

            <div className="flex flex-col gap-y-4">
                {/* Head cotenant les option de Salle */}
                <div className="bg-gray-200 w-screen p-2 left-0 flex flex-row justify-betwen ">
                    <div className="flex items-center"><h2 className="text-xl ">LISTE DES SALLES  </h2>
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
                    <button type="button" onClick={() => setAddModalOpen(true)} className="flex items-center w-24 text-white bg-blue-700 hover:text-white hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm my-2 px-2 py-2 text-center inline-flex me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
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
                {toast && (
                <Toast
                    message={toast.message}
                    color={toast.color}
                    onClose={() => setToast(null)}
                    />
                )}
                
                <div className="p-0">
                    { isLoading ? (
                        <DataTableShimmer />
                    ) : salleData.length === 0 ? (
                        <NoDataToDisplay />
                    ) : (
                        <DataTable
                        headers={[
                            { key: "NomSalle", label: "Noms" },
                            { key: "CodeSalle", label: "CodeSalle" },
                            { key: "Capacite", label: "Capacite(s)" },
                        ]}
                        data={salleData}
                        rowKey="idSalle"
                        onRowClick={handleRowClick}
                        />
                    )}
                    </div>

                    <div>
                        <SalleAddModal 
                            open={isAddModalOpen}
                            onClose={() => setAddModalOpen(false)}
                            onAddSalle={(handleAddSalle)}
                        />
                    </div>

                {/* Modal d'affichage des détails */}
                <DetailModal
                    open={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onDeleted={() => {
                        handeleDeletedSalle(selectedSalle.idSalle);
                    }}
                    title="Détails de l'Salle"
                >
                    {selectedSalle ? (
                        <div className="text-left">
                            <p className="text-lg font-medium text-gray-800">
                            Nom : {selectedSalle.NomSalle}
                            </p>
                            <p className="text-sm text-gray-500">
                            CodeSalle : {selectedSalle.CodeSalle}
                            </p>
                            <p className="text-sm text-gray-500">
                                Capacite : {selectedSalle.Capacite}
                            </p>
                            <p className="text-sm text-gray-500">
                                Longitude : {selectedSalle.Longitude+" °"}
                            </p>
                            <p className="text-sm text-gray-500">
                                Latitude : {selectedSalle.Latitude+" °"}
                            </p>

                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">Aucun salle sélectionné.</p>
                    )}
                     
                </DetailModal>
            </div>
            
        </div>
    )
}
export default SallePage;