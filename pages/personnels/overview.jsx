import React, {useState, useEffect} from "react";
// impost des icones
import { RiSearch2Line } from "react-icons/ri";
import { FaSortDown ,FaPlus, FaSort, FaFilter, FaPrint } from "react-icons/fa";

// importation des composants
import NoDataToDisplay from "@/components/generals/no_data_display";
import AlertModal from "@/components/modal/alert_modal";
import DataTable from "@/components/generals/table_Data";
import DetailModal from "@/components/modal/detail_modal";
import DispenseAddModal from "@/components/affectation/add-affectation";
import DataTableShimmer from "@/components/shimmers/data_table_shimmers";

// import des servives
import Toast from "@/components/generals/toast_message";
import { Dispense } from "@/services/dispense.services";
import { UE } from "@/services/ue.services";
import { Enseignant } from "@/services/enseignant.services";
import { AnneeAcademique } from "@/services/annee-academique.sevices";



function AffectationPage(){
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [stateSearchBar, setStateSearchBar] = useState(false);
    const [toast, setToast] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDispense, setSelectedDispense] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dispenseData, setDispenseData] = useState([]);
    const [enseignantData, setEnseignantData] = useState([]);
    const [ueDetails, setUEDetails] = useState(null);
    const [enseignantDetails, setEnseignantDetails] = useState(null);
    const [anneeDetails, setAnneeDetails] = useState(null);
    const [shouldRefreshData, setShouldRefreshData] = useState(false);


    const showToast = (message, color) => {
        setToast({ message, color });
        setTimeout(() => setToast(null), 5000);
    };

    const toggleShowSearchBar = () =>{
        setStateSearchBar(prevState => !prevState);
    }

    const handleRowClick = async (dispense) =>{
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
            console.error("erreur de recuperation des details ", error);
        }
    }

    const handleAddDispense = async(newDispense) => {
        try {
            const response = await Dispense.createDispense(newDispense);
            showToast("Afffectation ajoutee avec succès !", "green")
            setDispenseData([... dispenseData, response]);
            setShouldRefreshData(true);
        } catch (error) {
            showToast(`${error.response.data.error}`, "red");
        }
    }
    // suppression de 
    const handeleDeletedDispense = async(idDispense) =>{
        try {
            await Dispense.deleteDispense(idDispense);
            setDispenseData(prevDispenseData =>
                prevDispenseData.filter(dispense => dispense.idDispense !== idDispense)
              );
              showToast(`Dispense supprimé avec succès !`,"green");
            setDispenseData([... dispenseData, response]);
            
        } catch (error) {
            // console.log("wwwwwww ",id);
            // showToast(`${error.response.data.error}`, "red");
        }
    }
    useEffect(() => {
        if (shouldRefreshData) {
            const fetchDispense = async () => {
                try {
                    const dispenses = await Dispense.getAllDispenses();
                    setDispenseData(dispenses);
                    setShouldRefreshData(false); // Réinitialiser l'état après actualisation
                } catch (error) {
                    console.error("Erreur lors de l'actualisation des données des dispenses :", error);
                }
            };
    
            fetchDispense();
        }
    }, [shouldRefreshData]);
    
    useEffect(() => {
        const fetchDispense = async () => {
            try {
                const dispenses = await Dispense.getAllDispenses();
                const enseignants = await Enseignant.getAllEnseignants();
                const ues = await UE.getAllUEs();
                const annees = await AnneeAcademique.getAllAnneesAcademiques();
                console.log("anneee ", annees);
    
                // Mappez les données pour inclure les noms
                const transformedData = dispenses.map((dispense) => ({
                    ...dispense,
                    nomEnseignant: enseignants.find((ens) => ens.idEnseignant === dispense.idEnseignant)?.NomEnseignant || "Non spécifié",
                    nomUE: ues.find((ue) => ue.idUE === dispense.idUE)?.NomUE || "Non spécifié",
                    anneeAcademique: annees.find((annee) => String(annee.idAnneeAcademique) === String(dispense.idAnneeAcademique))?.ValueAnneeAcademique || "Non spécifié",
                }));
    
                setDispenseData(transformedData);
    
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };
        const fetchEnseignant = async () => {
            try {
                const ens = await Enseignant.getAllEnseignants();
                setEnseignantData(ens);
            } catch (error) {
                console.error("Erreur lors de la récupération des données des ens :", error);
            }
        };
        fetchDispense();
        fetchEnseignant();
    }, []);
                
    return(
        <div className="p-2 l-0 border-black sm:ml-64">
            {/* titre de la page */}
        <title>Home | Dispense</title>

            <div className="flex flex-col gap-y-4">
                {/* Head cotenant les option de Dispense */}
                <div className="bg-gray-200 w-screen p-2 left-0 flex flex-row justify-betwen ">
                    <div className="flex items-center"><h2 className="text-xl ">LISTE DES AFFECTATIONS  </h2>
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
                    ) : dispenseData.length === 0 ? (
                        <NoDataToDisplay />
                    ) : (
                        <DataTable
                        headers={[
                            { key: "nomUE", label: "UEs" },
                            { key: "nomEnseignant", label: "Enseignant Responsable" },
                            { key: "anneeAcademique", label: "Annee" },
                        ]}
                        data={dispenseData}
                        rowKey="idDispense"
                        onRowClick={handleRowClick}
                        />
                    )}
                    </div>

                    <div>
                        <DispenseAddModal 
                            open={isAddModalOpen}
                            onClose={() => setAddModalOpen(false)}
                            onAddDispense={(handleAddDispense)}
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
                        handeleDeletedDispense(selectedDispense.idDispense);
                    }}
                    title="Détails de l'Affectation"
                >
                    {selectedDispense ? (
                        <div className="text-left">
                            <p className="text-lg font-medium text-gray-800">
                                UEs :  {ueDetails?.NomUE || "_"}
                            </p>
                            <p className="text-lg font-medium text-gray-800">
                                Enseignant : {enseignantDetails?.NomEnseignant || "_"}
                            </p>
                            <p className="text-sm text-gray-500">
                                Annee Accademique : {anneeDetails?.ValueAnneeAcademique || "_"}
                            </p>
                            <p className="text-sm text-gray-500">
                                Responsabilite : {selectedDispense.isPrincipal ? "Principale" : "Assistant"}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">Aucun dispense sélectionné.</p>
                    )}
                     
                </DetailModal>
            </div>
            
        </div>
    )
    // fonction de filtre des ens en fonction des idUes
    const getEnseignantByIdUE = (idUE) =>{
        // je filtre les dispenses pour recuperer les enseignants corespondants a la ligne
        // corespondant au idUE selectionner
        const dispenseByIdUE = dispenseData.filter((dispense) => dispense.idEnseignant);
        // j'extrait les idEns dans les dispenses filtree
        const idEnseignants = dispenseByIdUE.map(dispense => dispense.idEnseignant);
        // maintenent je filtre les enseignants pour uniquement consever ceux dont leur id est dans idEnseignants extrait
        const EnseignantUE = enseignantData.filter(ens => idEnseignants.includes(ens.idEnseignant));

        return EnseignantUE
    };
}
export default AffectationPage;