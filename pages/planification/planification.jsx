import NavItem from "@/components/generals/navigationItems";
import { AnneeAcademique } from "@/services/annee-academique.sevices";
import { Parcours } from "@/services/parcours.services";
import { Semestre } from "@/services/semestre.services";
import { useState, useEffect } from "react";
import {FaFilter, FaPlus} from "react-icons/fa"
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line, RiCloseFill } from "react-icons/ri";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { Salle } from "@/services/salle.services";
import { MdOutlineReduceCapacity } from "react-icons/md";
import DataTableShimmer from "@/components/shimmers/select_shimmer";
import SelectShimmer from "@/components/shimmers/select_shimmer";
import { UE } from "@/services/ue.services";
import { Planification } from "@/services/planification.services";
import { Enseignant } from "@/services/enseignant.services";
import { Dispense } from "@/services/dispense.services";
import Toast from "@/components/generals/toast_message";

function PlanificationPage(){

    const [anneeAcademiqueData, setAnneeAcademiqueData] = useState([]);
    const [parcoursData, setParcoursData] = useState([]);
    const [semestreData, setSemestreData] = useState([]);
    const [salleData, setSalleData] = useState([]);
    const [dispenseData, setDispenseData] = useState([]);
    const [isNewClicked, setIsNewClicked] = useState(false);
    const [selectedAnnee, setSelectedAnnee] = useState(null);
    const [selectedSemestre, setSelectedSemestre] = useState(null);
    const [selectedParcours, setSelectedParcours] = useState(null);
    const [selectedSalle, setSelectedSalle] = useState(null);
    const [selectedSalleId, setSelectedSalleID] = useState(null);
    const [ueData, setUEData] = useState([]);
    const isSalleSelected = selectedSalle !== null;
    const [filteredPlanifications, setFilteredPlanifications] = useState([]);
    const [enseignantData, setEnseignantData] = useState([]);
    const [selectedDispense, setSelectedDispense] = useState([]);

    
    const [toast, setToast] = useState(null);
    const showToast = (message, color) => {
            setToast({ message, color });
            setTimeout(() => setToast(null), 20000);
        };

    const handleSalleSelection = (salle) => {
        setSelectedSalle(salle);
    };
    const handleNewClick = () => {
        setIsNewClicked(!isNewClicked);
    };
    const handleResetClik = () => {
        resetSelections();
        setIsNewClicked(null);
    }
    
    const handleAnneeChange = (e) => {
        setSelectedAnnee(e.target.value);
        // console.log(selectedAnnee);
    };
    
    const handleSemestreChange = (e) => {
        setSelectedSemestre(e.target.value);
        // console.log(selectedSemestre);
    };
    
    const handleParcoursChange = (e) => {
        setSelectedParcours(e.target.value);
        // console.log("la valeur apres selection est :",selectedParcours);
    };
    const handleSalleChange = (e) => {
        setSelectedSalleID(e.target.value);
        console.log("Id de la salle selestionnee est : ",e.target.value);
    };

    const filterPlanifications = async () => {
        if (selectedAnnee && selectedSemestre && selectedParcours && selectedSalleId) {
            try {
                // Récupérer toutes les planifications
                const allPlanifications = await Planification.getAllPlanifications();
    
                // Filtrer les planifications en fonction des critères sélectionnés
                const filteredData = allPlanifications.filter(planification => 
                    String(planification.idAnneeAcademique) === String(selectedAnnee) &&
                    String(planification.idSemestre) === String(selectedSemestre) &&
                    // String(planification.idParcours) === String(selectedParcours) &&
                    String(planification.idSalle) === String(selectedSalleId)
                );
    
                // Mettre à jour l'état avec les données filtrées
                setFilteredPlanifications(filteredData);
                console.log("Données filtrées :", filteredData);
            } catch (error) {
                console.log('Erreur lors de la récupération des planifications filtrées:', error);
            }
        } else {
            setFilteredPlanifications([]); // Effacer les données filtrées si les sélections sont incomplètes
        }
    };
    
    useEffect(() => {
        console.log("Filtrage avec :", {
            selectedAnnee,
            selectedSemestre,
            selectedParcours,
            selectedSalleId,
        });
        filterPlanifications();
    }, [selectedAnnee, selectedSemestre, selectedParcours, selectedSalleId]);
    
           
    useEffect(() => {
        const fetchParcours = async() =>{
            try {
                const parcours = await Parcours.getAllParcours();
                setParcoursData(parcours);
            } catch (error) {
                console.error(`${error.reponse.data.error}`, error)
            }
        };
        
        const fetchSemestre = async() =>{
            try {
                const semestre = await Semestre.getAllSemestres();
                setSemestreData(semestre);
            } catch (error) {
                console.error("Erreur lors de la recuperation des Semestres");
            }
        };
        const fetchAnneeAcademique = async () => {
            try {
                const annee = await AnneeAcademique.getAllAnneesAcademiques();
                setAnneeAcademiqueData(annee);
                
            } catch (error) {
                console.error("Erreur lors de la récupération des données des dispense: ", error);
            }
        };
        const fetchSalle = async () => {
            try {
                const annee = await Salle.getAllSalles();
                setSalleData(annee);
                
            } catch (error) {
                console.error("Erreur lors de la récupération des données des dispense: ", error);
            }
        };
        const fetchUE = async () => {
            try {
                const ue = await UE.getAllUEs();
                setUEData(ue);
                
            } catch (error) {
                console.error("Erreur lors de la récupération des données des ue: ", error);
            }
        };
        const fetchEnseignant = async () => {
            try {
                const ens = await Enseignant.getAllEnseignants();
                setEnseignantData(ens);
                
            } catch (error) {
                console.error("Erreur lors de la récupération des données des ue: ", error);
            }
        };

        const fetchDispense = async () => {
            try {
                const dispense = await Dispense.getAllDispenses();
                setDispenseData(dispense);
                
            } catch (error) {
                console.error("Erreur lors de la récupération des données des ue: ", error);
            }
        };
        fetchAnneeAcademique();
        fetchParcours();
        fetchSemestre();
        fetchSalle();
        fetchUE();
        fetchEnseignant();
        fetchDispense();
    }, []);

// *******************************Section de l'emplo******************************
    const [modalAddPlanification, setModalAddPlaniification] = useState(null);

    const PlagesHoraires = [
        "7h30-9h30", "9h30-11h30", "11h30-13h30", "13h30-15h30", "15h30-17h30", "17h30-19h30"
    ];
    const JoursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    const openModal = (timeSlot, day) => {
    setModalAddPlaniification({ timeSlot, day });
    };

    const closeModal = () => {
    setModalAddPlaniification(null);
    };

    // ******************** CRER EMPLO************************
    const handleAddPlanification = async (e) => {
        e.preventDefault();
    
        const newPlanification = {
            PlageHoraire: modalAddPlanification.timeSlot,
            Jours: modalAddPlanification.day,
            idDispense: selectedDispense,
            idParcours: selectedParcours,
            idAnneeAcademique: selectedAnnee,
            idSemestre: selectedSemestre,
            idSalle: selectedSalleId,
        };
    
        try {
            const response = await Planification.createPlanification(newPlanification);
    
            // Mettre à jour l'état après l'ajout
            setFilteredPlanifications((prev) => [...prev, response]);
        // Optionnel : mettre à jour dispenseData et ueData si nécessaire
        const updatedDispenseData = dispenseData.map(dispense => 
            dispense.idDispense === response.idDispense ? response : dispense
        );

        const updatedUEData = ueData.map(ue => 
            ue.idUE === response.idUE ? response : ue
        );

        setDispenseData(updatedDispenseData);
        setUEData(updatedUEData);

        // Refiltrer les planifications
        filterPlanifications();
            closeModal();
            showToast("Planification ajoutee avec succès !", "green")
        } catch (error) {
            showToast(`${error.response.data.error}`, "red");
        }
    };

    const resetSelections = () => {
        setSelectedAnnee(null);
        setSelectedSemestre(null);
        setSelectedParcours(null);
        setSelectedSalle(null);
        setSelectedSalleID(null);
        setSelectedDispense([]);
        setFilteredPlanifications([]);
    };
    

    return(
        <div className="h-16  l-0 bg-[#002157]">
            {/* titre de la page */}
        <title>Home | Planification</title>

            <div className="flex sm:ml-64 gap-y-2">
                <aside id="logo-sidebar" className={`fixed "rounded-lg bg-[#E5E5E5] dark:border-gray-700 w-[255px] top-0 left-0 z-40 w-65 h-screen transition-transform -translate-x-full  sm:translate-x-0 `} aria-label="Sidebar">
                    <div className="h-16 bg-[#002157] items-center">
                        <p className="text-white font-medium mx-2 p-4">TABLEAU DE PLANIFIVATION</p>
                    </div>
                    {ueData.map((ue) =>(
                        <div key={ue.idUE} className={` ${!selectedSalle ? "hidden" : ""} grid grid-cols-2 gap-4 bg-blue-500 text-white rounded-t p-3 border-b border-gray-300 dark:border-gray-600`}>
                            <div className="flex items-center">
                            <p className="font-semibold text-xs  max-w-xs">{ue.NomUE}</p>
                            </div>
                            <div className="flex flex-col items-end space-y-1 text-xs">
                            <p>
                                <span className="font-medium">V Total :</span> {ue.VolumeHoraire}
                            </p>
                            <p>
                                <span className="font-medium">V Restant :</span> {ue.DebitHoraire}
                            </p>
                            </div>
                    </div>
                    
                    ))}
                    

                    <div className={`${selectedSalle? "hidden":""}`}>
                    {!isNewClicked ? <SelectShimmer /> : (
                        <div className=" bg-white h-24 my-2 m-2 rounded-lg">
                            <div className="py-2 m-3">
                                <label htmlFor="AnneeAcademique" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    AnneeAcademique
                                </label>
                                <select 
                                    name="idAnneeAcademique"
                                    id="idAnneeAcademique" 
                                    onChange={handleAnneeChange}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                >
                                    <option selected >Selectionner</option>
                                    {anneeAcademiqueData.map((annee) =>(
                                        <option key={annee.idAnneeAcademique} value={annee.idAnneeAcademique}>
                                            {annee.ValueAnneeAcademique}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    {/* Semestr */}
                    {!selectedAnnee ? <SelectShimmer /> : (
                        <div className="bg-white h-24 my-2 m-2 rounded-lg">
                            <div className="py-2 m-3">
                                <label htmlFor="Semestre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Semestre
                                </label>
                                <select name="NumeroSemestre" id="idSemestre" 
                                    // value={formData.idSemestre}
                                    onChange={handleSemestreChange}
                                    
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                >
                                    <option >Selectionner</option>
                                    {semestreData.map((semestre) =>(
                                        <option key={semestre.idSemestre} value={semestre.idSemestre}>{semestre.NumeroSemestre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    {!selectedSemestre ? <SelectShimmer /> : (
                        <div className="bg-white h-24 my-2 m-2 rounded-lg">
                            <div className="py-2 m-3">
                                <label htmlFor="Parcours" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Parcours
                                </label>
                                <select 
                                    name="idParcours" id="idParcours" 
                                    onChange={handleParcoursChange}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block mr-2 w-3/3 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                >
                                    <option >Selectionner</option>
                                    {parcoursData.map((parcours) =>(
                                        <option key={parcours.idParcours}value={parcours.idParcours}>
                                            {parcours.CodeParcours}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    </div>
                </aside> {/* fin de side barr*/}
                {/* debut plannif */}
                <div className="h-16 ">
                    <div className="flex">
                        <div className=" bg-blue-700 h-12 w-26 my-2 ml-[-1] mb-[-3] hover:bg-blue-900 rounded-t-lg">
                        <button onClick={handleNewClick} className="mx-3 text-xl text-white font-medium flex gap-y-2 pt-3">
                            <FaPlus className="mt- pr-1 text-3xl  text-orange-500 " />
                            Nouvel
                        </button>
                    </div>
                    <div className=" bg-green-700 h-12 w-26 my-2 mx-9  hover:bg-green-900 rounded-t-lg">
                        <button onClick={handleResetClik} className="mx-3 text-xl text-white font-medium flex gap-y-2 pt-3">
                            <FaPlus className="mt- pr-1 text-3xl  text-white " />
                            Enregistrer
                        </button>
                    </div>
                    </div>
                    
                    {toast && (  
                            <Toast  
                                message={toast.message}  
                                color={toast.color}  
                                onClose={() => setToast(null)}  
                            />  
                        )} 

                </div>

            </div>
            <div className={`${selectedSalle ? "hidden" : ""} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 sm:ml-64`}>
            {salleData.map(salle => (
                <button
                    key={salle.CodeSalle}
                    onClick={() => {
                        handleSalleSelection(salle);
                        handleSalleChange({ target: { value: salle.idSalle } });
                    }}
                    className={`relative p-2 bg-white rounded-lg shadow ${!selectedParcours ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={!selectedParcours} 
                >
                    <div className="flex items-center bg-[#002157]  justify-between p-4 border-b rounded-t">
                    <h3 className="text-xl text-white font-semibold">
                        {salle.CodeSalle}
                    </h3>
                    </div>
                    <div className="p-4 text-center">
                    <div className="mb-5 text-gray-500 flex justify-center">
                        <MdOutlineReduceCapacity className="text-orange-500 mr-3 text-2xl"/>
                        {salle.Capacite} places
                    </div>
                    </div>
                </button>
                ))}
            </div>

            <div className="sm:ml-64">
                <div className="bg-gray-100 w-full p-4">
                {isSalleSelected && (
                    <div className="bg-white shadow-md rounded-lg p-4 mx-2 mb-4">
                        <h2 className="text-xl font-bold mb-2">Informations de Planification</h2>
                        <div className="flex">
                            <p className="text-gray-600 px-9">Année académique: <strong> {anneeAcademiqueData.find(annee => String(annee.idAnneeAcademique) === String(selectedAnnee))?.ValueAnneeAcademique}, </strong></p>
                            <p className="text-gray-600">Semestre: <strong> {semestreData.find(semestre => String(semestre.idSemestre) === String(selectedSemestre))?.NumeroSemestre}</strong></p>
                            <p className="text-gray-600 px-9">Parcours: <strong> {parcoursData.find(parcours => String(parcours.idParcours) === String(selectedParcours))?.NomParcours}, </strong></p>
                            <p className="text-gray-600">Salle: <strong className="text-orange-500"> {salleData.find(salle => String(salle.idSalle) === String(selectedSalleId))?.NomSalle} ...</strong></p>
                             <strong className="text-blue-500">( {salleData.find(salle => String(salle.idSalle) === String(selectedSalleId))?.CodeSalle} )</strong>
                        </div>
                    </div>
                )}


                {/* Schedule Table */}
                {selectedSalle ? (
                <div className={`  mx-2`} >
                    <table className="table-auto border-collapse w-full h-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Plages Horaires</th>
                                {JoursSemaine.map((day) => (
                                    <th key={day} className="border border-gray-300 p-2">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {PlagesHoraires.map((timeSlot) => (
                                <tr key={timeSlot}>
                                    <td className="border w-9 border-gray-300 p-2">{timeSlot}</td>
                                    {JoursSemaine.map((day) => {
                                        const planificationForCell = filteredPlanifications.find(planification =>
                                            planification.PlageHoraire === timeSlot && planification.Jours === day
                                        );
                                        return (
                                            <td key={`${timeSlot}-${day}`} className="border border-gray-300 p-2 text-center">
                                                {planificationForCell ? (
                                                    <div>
                                                        <p className=" text-sm font-bold">
                                                        {/* {parcoursData.find(par => (String(par.idParcours)) === (String(planificationForCell?.Dispense?.idParcours)))?.CodeParcours || "Parc non définie"}  */}
                                                        : {ueData.find(ue => ue.idUE === planificationForCell?.Dispense?.idUE)?.CodeUE || "UE non définie"}
                                                        </p>
                                                        <p className=" text-sm">{ueData.find(ue => ue.idUE === planificationForCell?.Dispense?.idUE)?.NomUE || "UE non définie"}</p>
                                                        <p className=" text-sm">{enseignantData.find(ens => ens.idEnseignant === planificationForCell?.Dispense?.idEnseignant)?.NomEnseignant || "Enseignant non défini"}</p>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                                        onClick={() => openModal(timeSlot, day)}
                                                    >
                                                        +
                                                    </button>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                    <p className="text-center">Aucune planification trouvée pour les critères sélectionnés.</p>
                )}

            {/* Modal */}
            {modalAddPlanification && selectedAnnee && selectedSemestre && selectedParcours && selectedSalleId && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Ajouter une planification</h2>
                        <p className="text-gray-600 mb-4">
                            Plage horaire: {modalAddPlanification.timeSlot}, Jour: {modalAddPlanification.day}
                        </p>
                        {/* <p className="text-gray-600 mb-4">
                            Salle: {salleData.find(salle => String(salle.idSalle) === String(selectedSalleId))?.NomSalle}, 
                            Parcours: {parcoursData.find(parcours => String(parcours.idParcours) === String(selectedParcours))?.NomParcours}, 
                            Année académique: {anneeAcademiqueData.find(annee => String(annee.idAnneeAcademique) === String(selectedAnnee))?.ValueAnneeAcademique}, 
                            Semestre: {semestreData.find(semestre => String(semestre.idSemestre) === String(selectedSemestre))?.NumeroSemestre}
                        </p> */}

                        <form onSubmit={handleAddPlanification}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Unite d'enseignament</label>
                                <select
                                    value={selectedDispense}
                                    onChange={(e) => setSelectedDispense(e.target.value)}
                                    className="w-full border-gray-300 rounded-lg p-2"
                                    required
                                >
                                    <option value="">Sélectionner une UE</option>
                                    {dispenseData
                                        .filter((dispense) => dispense.isPrincipal)
                                        .map((dispense) => {
                                            const ue = ueData.find(ue => 
                                                ue.idUE === dispense.idUE &&
                                                (String(ue.idParcours)) === String(selectedParcours) &&
                                                (String(ue.idSemestre)) === String(selectedSemestre) &&
                                                ue.DebitHoraire > 0
                                            );

                                            return ue ? (
                                                <option key={dispense.idDispense} value={dispense.idDispense}>
                                                    {ue.NomUE}
                                                </option>
                                            ) : null; // Ne rien rendre si l'UE n'est pas trouvée
                                        })}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="bg-gray-300 px-4 py-2 rounded"
                                    onClick={closeModal}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            </div>
        </div>
    </div>
    )
}
export default PlanificationPage;
