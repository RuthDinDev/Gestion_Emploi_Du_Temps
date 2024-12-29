import { Parcours } from "@/services/parcours.services";
import { Semestre } from "@/services/semestre.services";
import React, { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";

const UEAddModal = ({ open, onClose, onAddUe }) => {

    // Recuperation des parcours
    const [parcoursData, setParcoursData] = useState([]);
    useEffect(() =>{
        const fetchParcours = async() =>{
            try {
                const parcours = await Parcours.getAllParcours();
                setParcoursData(parcours);
            } catch (error) {
                console.error(`${error.reponse.data.error}`, error)
            }
        };
        fetchParcours();
    }, []);
    // recupere les semestes
    const [semestreData, setSemestreData] = useState([]);
    useEffect(() =>{
        const fetchSemestre = async() =>{
            try {
                const semestre = await Semestre.getAllSemestres();
                setSemestreData(semestre);
            } catch (error) {
                console.error("Erreur lors de la recuperation des Semestres");
            }
        };
        fetchSemestre();
    }, []);
    
  const [formData, setFormData] = useState({
    CodeUE: "",
    NomUE: "",
    CreditUE: "",
    VolumeHoraire: "",
    DebitHoraire: "",
    idSemestre: "",
    idParcours: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      ...(name === "VolumeHoraire" ? { DebitHoraire: value } : {}),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      onAddUe(formData);
      setFormData({
        CodeUE: "", 
        NomUE: "", 
        CreditUE: "", 
        VolumeHoraire: "",
        DebitHoraire: "",
        idSemestre: "",
        idParcours: "",
    });
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'UE ", error);
    }
    console.log("UE ajoutée : ", formData);
    
    onClose();
  };

  return (
    <div className="">

      {/* Main modal */}
      <div
        id="teacher-add-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          open ? "block" : "hidden"
        } fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center w-full h-full backdrop-blur-sm bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Ajouter une nouvelle UE
              </h3>
             <RiCloseFill
                type="button"
                onClick={onClose}
                className="absolute top-3 end-2.5 text-gray-400 text-2xl hover:text-red-500 hover:text-5xl rounded-lg  w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            />
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="NomUE" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                    Nom
                  </label>
                  <input
                    type="text"
                    id="NomUE"
                    name="NomUE"
                    placeholder="Nom"
                    value={formData.NomUE}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div className="flex">
                    <div className="mx-1">
                        <label htmlFor="CodeUE" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                            CodeUE
                        </label>
                        <input
                            type="text"
                            id="CodeUE"
                            name="CodeUE"
                            placeholder="CodeUE"
                            value={formData.CodeUE}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    
                    <div className="mx-1">
                        <label htmlFor="CreditUE" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                            CreditUE
                        </label>
                        <input
                            type="number"
                            id="CreditUE"
                            name="CreditUE"
                            placeholder="CreditUE"
                            value={formData.CreditUE}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                    <div className="mx-1">
                        <label htmlFor="VolumeHoraire" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                            VolumeHoraire
                        </label>
                        <input
                            type="number"
                            id="VolumeHoraire"
                            name="VolumeHoraire"
                            placeholder="VolumeHoraire"
                            value={formData.VolumeHoraire}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className="ml-">
                        <label htmlFor="Parcours" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Parcours
                        </label>
                        <select name="idParcours" id="idParcours" 
                            value={formData.idParcours}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block mr-2 w-3/3 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        >
                            <option >Selectionner</option>
                            {parcoursData.map((parcours) =>(
                                <option key={parcours.idParcours}value={parcours.idParcours}>
                                    {parcours.NomParcours}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="ml-">
                        <label htmlFor="Semestre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Semestre
                        </label>
                        <select name="idSemestre" id="idSemestre" 
                            value={formData.idSemestre}
                            onChange={handleChange}
                            
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block w-36  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        >
                            <option >Selectionner</option>
                            {semestreData.map((semestre) =>(
                                <option key={semestre.idSemestre} value={semestre.idSemestre}>{semestre.NumeroSemestre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                  Ajouter UE
                </button>
              </form>
              <div className="flex items-center gap-4 my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="text-gray-500 font-medium px-4">Ou</span>
                <hr className="flex-1 border-gray-300" />
            </div>
            <form className="space-y-4" onSubmit={null}>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Excel, CSV</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div> 
            </form>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UEAddModal;
