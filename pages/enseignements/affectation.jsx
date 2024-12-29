import React, { useState, useEffect } from "react";  
import { RiSearch2Line } from "react-icons/ri";  
import { FaUserTie, FaSortDown, FaPlus, FaSort, FaFilter, FaPrint } from "react-icons/fa";  
import NoDataToDisplay from "@/components/generals/no_data_display";  
import DetailModal from "@/components/modal/detail_modal";  
import DispenseAddModal from "@/components/affectation/add-affectation";  
import DataTableShimmer from "@/components/shimmers/data_table_shimmers";  
import Toast from "@/components/generals/toast_message";  
import { Dispense } from "@/services/dispense.services";  
import { UE } from "@/services/ue.services";  
import { Enseignant } from "@/services/enseignant.services";  
import { AnneeAcademique } from "@/services/annee-academique.sevices";  

function AffectationPage() {  
    const [isAddModalOpen, setAddModalOpen] = useState(false);  
    const [stateSearchBar, setStateSearchBar] = useState(false);  
    const [toast, setToast] = useState(null);  
    const [isModalOpen, setModalOpen] = useState(false);  
    const [selectedDispense, setSelectedDispense] = useState(null);  
    const [isLoading, setIsLoading] = useState(true);  
    const [dispenseData, setDispenseData] = useState([]);  
    const [enseignantData, setEnseignantData] = useState([]);  
    const [ueData, setUEData] = useState([]);  
    const [anneeAcademiqueData, setAnneeAcademiqueData] = useState([]);  
    const [ueDetails, setUEDetails] = useState(null);  
    const [enseignantDetails, setEnseignantDetails] = useState(null);  
    const [anneeDetails, setAnneeDetails] = useState(null);  

    const showToast = (message, color) => {  
        setToast({ message, color });  
        setTimeout(() => setToast(null), 5000);  
    };  

    const toggleShowSearchBar = () => {  
        setStateSearchBar(prevState => !prevState);  
    };  

    const handleRowClick = async (dispense) => {  
        setSelectedDispense(dispense);  
        setModalOpen(true);  
        try {  
            const ue = await UE.getUEById(dispense.idUE);  
            const enseignant = await Enseignant.getEnseignantById(dispense.idEnseignant);  
            const annee = await AnneeAcademique.getAnneeAcademiqueById(dispense.idAnneeAcademique);  

            setUEDetails(ue);  
            setEnseignantDetails(enseignant);  
            setAnneeDetails(annee);  
        } catch (error) {  
            console.error("Erreur de récupération des détails ", error);  
        }  
    };  

    const handleAddDispense = async (newDispense) => {  
        try {  
            const response = await Dispense.createDispense(newDispense);  
            showToast("Affectation ajoutée avec succès !", "green");  
            setDispenseData([...dispenseData, response]);  
        } catch (error) {  
            showToast(`${error.response.data.error}`, "red");  
        }  
    };  

    const handleDeletedDispense = async (idDispense) => {  
        try {  
            await Dispense.deleteDispense(idDispense);  
            setDispenseData(prevDispenseData =>  
                prevDispenseData.filter(dispense => dispense.idDispense !== idDispense)  
            );  
            showToast(`Dispense supprimée avec succès !`, "green");  
        } catch (error) {  
            console.error("Erreur lors de la suppression de la dispense", error);  
        }  
    };  

    useEffect(() => {  
        const fetchDispense = async () => {  
            try {  
                const dispenses = await Dispense.getAllDispenses();  
                setDispenseData(dispenses);  
                setTimeout(() => {  
                    setIsLoading(false);  
                }, 1000);  
            } catch (error) {  
                console.error("Erreur lors de la récupération des données des dispenses :", error);  
            }  
        };  
        
        const fetchEnseignant = async () => {  
            try {  
                const ens = await Enseignant.getAllEnseignants();  
                setEnseignantData(ens);  
            } catch (error) {  
                console.error("Erreur lors de la récupération des données des enseignants :", error);  
            }  
        };  

        const fetchUE = async () => {  
            try {  
                const ue = await UE.getAllUEs();  
                setUEData(ue);  
            } catch (error) {  
                console.error("Erreur lors de la récupération des données des UEs: ", error);  
            }  
        };  
        
        const fetchAnneeAcademique = async () => {  
            try {  
                const annee = await AnneeAcademique.getAllAnneesAcademiques();  
                setAnneeAcademiqueData(annee);  
            } catch (error) {  
                console.error("Erreur lors de la récupération des données des années académiques: ", error);  
            }  
        };  

        fetchAnneeAcademique();  
        fetchUE();  
        fetchDispense();  
        fetchEnseignant();  
    }, []);  

    return (  
        <div className="p-2 l-0 border-black sm:ml-64">  
            <title>Home | Dispense</title>  

            <div className="flex flex-col gap-y-4">  
                <div className="bg-gray-200 w- p-2 left-0 flex flex-row justify-between">  
                    <div className="flex items-center">  
                        <h2 className="text-xl wifull">LISTE AFFECTATIONS</h2>  
                        <div className="flex items-center pl-5 mx-auto">   
                            {stateSearchBar ?   
                                <div className="relative w-full">  
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">  
                                        <RiSearch2Line />  
                                    </div>  
                                    <input className="bg-gray-300 w-64 text-gray-900 text-sm rounded-lg outline-none ps-10 p-2.5" placeholder="Search ..." />  
                                </div> : null}  
                            <div onClick={toggleShowSearchBar} className="p-2.5 ms-3 mr-3 text-sm font-medium text-black rounded-lg bg-gray-300 hover:bg-white">  
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">  
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>  
                                </svg>  
                                <span className="sr-only">Search</span>  
                            </div>  
                        </div>  
                    </div>  
                    <button type="button" onClick={() => setAddModalOpen(true)} className="flex items-center w-24 text-white bg-blue-700 hover:text-white hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm my-2 px-2 py-2 text-center inline-flex me-2 mb-2">  
                        <FaPlus className="mr-1" />  
                        Ajouter  
                    </button>  
                    <button type="button" className="flex items-center w-24 text-gray-700 bg-white hover:text-black border border-gray-200 hover:bg-gray-200 focus:ring-blue-300 font-medium rounded-lg text-sm my-2 px-2 py-2 text-center inline-flex me-2 mb-2">  
                        <FaFilter className="mr-1" />  
                        Filtrer  
                    </button>  
                    <button type="button" className="flex items-center w-24 text-gray-700 bg-white hover:text-black border border-gray-200 hover:bg-gray-200 focus:ring-blue-300 font-medium rounded-lg text-sm my-2 px-2 py-2 text-center inline-flex me-2 mb-2">  
                        <FaSort className="mr-1" />  
                        Trier  
                    </button>  
                    <button type="button" className="flex items-center w-24 text-white bg-yellow-400 hover:text-black border border-gray-200 hover:bg-gray-200 focus:ring-blue-300 font-medium rounded-lg text-sm my-2 px-2 py-2 text-center inline-flex me-2 mb-2">  
                        <FaPrint className="mr-1" />  
                        Imprimer  
                    </button>  
                    <button type="button" onClick={() => setAddModalOpen(true)} className="flex items-center w-24 text-white bg-green-700 hover:text-white hover:bg-green-800 focus:ring-blue-300 font-medium rounded-lg text-sm my-2 px-2 py-2 text-center inline-flex me-2 mb-2">  
                        <FaPlus className="mr-1" />  
                        Envoyer  
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
                    {isLoading ? (  
                        <DataTableShimmer />  
                    ) : dispenseData.length === 0 ? (  
                        <NoDataToDisplay />  
                    ) : (  
                        <div className="bg-gray-200 shadow rounded-lg">  
                            {/* En-tête */}  
                            <div className="bg-gray-100 text-gray-800 font-semibold flex justify-between py-2 px-4 rounded-t-lg">  
                                <p className="w-1/3">Noms Enseignant</p>  
                                <p className="w-1/3">UEs</p>  
                                <p className="w-1/3">Année</p>
                            </div>  

                            {/* Liste des dispenses */}  
                            <ul className="divide-y divide-gray-100">  
                                {dispenseData.map((item, idx) => (  
                                    <li  
                                        key={item.idDispense || idx}  
                                        className="flex justify-between bg-white items-center transition-75 py-2 px-4 hover:bg-gray-100 cursor-pointer"  
                                        onClick={() => handleRowClick(item)}  
                                    >  
                                        <FaUserTie className={`mr-4 ${item.isPrincipal? "text-green-500" : "text-yellow-500"}`} /><p className="w-1/3 text-lg text-gray-500">{enseignantData.find(ens => ens.idEnseignant === item.idEnseignant)?.NomEnseignant || "_"}</p>  
                                        <p className="w-1/3 text-lg text-gray-500">{ueData.find(ue => ue.idUE === item.idUE)?.NomUE || "_"}</p>  
                                        <p className="w-1/3 text-lg text-gray-500">{anneeAcademiqueData.find(annee => String(annee.idAnneeAcademique) === String(item.idAnneeAcademique))?.ValueAnneeAcademique || "_"}</p>  
                                    </li>  
                                ))}  
                            </ul>  
                        </div>  
                    )}  
                </div>  

                <div>  
                    <DispenseAddModal   
                        open={isAddModalOpen}  
                        onClose={() => setAddModalOpen(false)}  
                        onAddDispense={handleAddDispense}  
                    />  
                </div>  

                {/* Modal d'affichage des détails */}  
                <DetailModal  
                    open={isModalOpen}  
                    onClose={() => {  
                        setModalOpen(false);  
                        setSelectedDispense(null);  
                        setUEDetails(null);  
                        setEnseignantDetails(null);  
                        setAnneeDetails(null);  
                    }}  
                    onDeleted={() => {  
                        handleDeletedDispense(selectedDispense.idDispense);  
                    }}  
                    title="Détails de l'Affectation"  
                >  
                    {selectedDispense ? (  
                        <div className="text-left">  
                            <p className="text-lg font-medium text-gray-800">  
                                UEs : {ueDetails?.NomUE || "_"}  
                            </p>  
                            <p className="text-lg font-medium text-gray-800">  
                                Enseignant : {enseignantDetails?.NomEnseignant || "_"}  
                            </p>  
                            <p className="text-sm text-gray-500">  
                                Année Académique : {anneeDetails?.ValueAnneeAcademique || "_"}  
                            </p>  
                            <p className="text-sm text-gray-500">  
                                Responsabilité : {selectedDispense.isPrincipal ? "Principal" : "Assistant"}  
                            </p>  
                        </div>  
                    ) : (  
                        <p className="text-sm text-gray-500">Aucune dispense sélectionnée.</p>  
                    )}  
                </DetailModal>  
            </div>  
        </div>  
    );  
}  

export default AffectationPage;  
