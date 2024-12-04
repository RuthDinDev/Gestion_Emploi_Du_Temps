import Profil from "@/components/generals/profil.component";
import FooterLayout from "@/layouts/footer";
import React, {useState} from "react";
import { MdLightMode } from "react-icons/md";


function HeaderPage(){

        // etat pour le modal de profil
        const [stateProfil, setStateProfil] = useState(false);

        //basculer le modal profil
        const toggleProfilModal =()=>{
            setStateProfil(prevState => !prevState);
        }
    
        // etat pour basculer lemode d'affichage
        const [stateModeChange, setStateModeChange] = useState(false);
        // basculer en mode ligth et dark
        const toggleModeChange =()=>{
            setStateModeChange((prevState) => !prevState);
        }

        
    return(
        <div className="p-2 l-0 sm:ml-64">        
            <nav className={` ${stateModeChange ? "bg-gray-800" : "bg-gray-200"} top-0 z-50 w-full  border-b border-gray-200`}>
                <div className="px-3 py-3 lg:px-5 lg:pl-3 ">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <div className="text-center">
                                <div className={`${stateModeChange ? "text-white" : "text-black"}`}>FACULTES DES SCIENCES DE L'UNIVESITE DE NGAOUNDERE</div> 
                            </div>
                            
                        </div>
                    
                    {stateProfil &&(
                        <Profil 
                        closeModal={toggleProfilModal}
                      />
                    )}
                    <div className="flex items-center">
                        <div>
                            <MdLightMode onClick={toggleModeChange} className={`${stateModeChange ? "text-white" : "text-black"} text-2xl `}/>
                        </div>
                        <div className="flex items-center ms-3">
                            <button onClick={toggleProfilModal} type="button" className={`flex text-sm bg-transparent rounded-lg focus:ring-4 focus:ring-white dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user`}>
                                
                                <span className="sr-only">{stateProfil ? "Close user menu": "Open user menu" } </span>
                                <img className="w-9 h-9 rounded-full" src="/images/mon_profil.jpeg" alt="Profil"/>
                                <span className={` ${stateModeChange ? "text-white" : "text-black"} mx-2 mt-1`}>The Peace</span>
                                
                            </button>
                            
                        </div>
                    </div>

                    </div>
                </div>
                </nav>
                <FooterLayout/>
            
        </div>
    )
}
export default HeaderPage