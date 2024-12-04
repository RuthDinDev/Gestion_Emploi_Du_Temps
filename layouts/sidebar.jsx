import clsx from 'clsx';

import React, { useState } from 'react';
import CarouselHome from './carouselHome';
import { IoMdClose } from "react-icons/io";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { MdCabin } from "react-icons/md";
import { LuInspect } from "react-icons/lu";
import { PiExam } from "react-icons/pi";
import { MdOutlineArchive } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { PiSignInFill } from "react-icons/pi";
import FooterLayout from './footer';
import Profil from '@/components/generals/profil.component';
import NavItem from '@/components/generals/navigationItems';
import Dashboard from '@/pages/dashboard/dashboard';
import HedearPage from './header';

function SidebarPage () {

    // état pour ouvrir un seul menu déroulant à la fois
    const [openDropdown, setOpenDropdown] = useState(null);

    // Fonction pour gérer le changement d'état d'un menu
    const toggleScroll = (index) => {
    // Si le menu cliqué est déjà ouvert, on le ferme, sinon on ouvre ce menu et ferme les autres
    setOpenDropdown((prevState) => (prevState === index ? null : index));
    };


    // etat pour basculer lemode d'affichage
    const [stateModeChange, setStateModeChange] = useState(false);
    // basculer en mode ligth et dark
    const toggleModeChange =()=>{
        setStateModeChange((prevState) => !prevState);
    }
    return <>

        <aside id="logo-sidebar" className={`fixed ${stateModeChange ? "dark:bg-gray-800 dark:border-gray-700" : "bg-gray-200"}  w-[255px] top-0 left-0 z-40 w-65 h-screen pt-5 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 `} aria-label="Sidebar">
            <div className="p-5">
              <a href="#" className="flex-row md:me-24">
                <div className="flex ">
                    <img src="/images/logoFS.png" className="h-14 me-3 ml-14 hover:animate-spin" alt="Logo FS" />
                    {/* <div className="text-green-500 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">FS</div>                         */}
                </div>
                <div className="text-orange-400  ml-10 self-center text-xl font-semibold sm:text-xl whitespace-nowrap dark:text-white">FS NDERE</div>
              </a>   
            </div>
                     
            <div className={`${stateModeChange ? "bg-gray-800" : "bg-gray-200"}  h-full px-3 pb-4 overflow-y-auto  `}>
            <ul>
                {/* Dashboard */}
                <a href="/dashboard/dashboard">
                     <NavItem
                    Icon={AiOutlineDashboard}
                    text="Dashboard"
                    isDropdown={false}
                    stateScroll={false}
                    onClick={() => {}}
                />
                </a>
               

                {/* Planifications */}
                <NavItem
                    Icon={PiExam}
                    text="Planifications"
                    count="3"
                    isDropdown={false}
                    stateScroll={false}
                    onClick={() => {}}
                />

                {/* Personnels */}
                <NavItem
                    Icon={MdCabin}
                    text="Personnels"
                    isDropdown={true}
                    stateScroll={openDropdown === "personnels"}
                    onClick={toggleScroll}
                    index="personnels"
                    subItems={[
                        { label: "Overview", link: "/overview" },
                        { label: "Enseignant", link: "/enseignants" },
                    ]}
                />

                {/* Enseignements */}
                <NavItem
                    Icon={MdCabin}
                    text="Enseignements"
                    isDropdown={true}
                    stateScroll={openDropdown === "enseignements"}
                    onClick={toggleScroll}
                    index="enseignements"
                    subItems={[
                    { label: "Unites UEs", link: "/enseignements/ue" },
                    { label: "Affectation", link: "/enseignements/affectation" },
                    ]}
                />

                {/* Formations */}
                <NavItem
                    Icon={LuInspect}
                    text="Formations"
                    isDropdown={false}
                    count="Pro"
                    stateScroll={false}
                    onClick={() => {}}
                />

                {/* Salles */}
                <NavItem
                    Icon={MdOutlineArchive}
                    text="Salles"
                    isDropdown={false}
                    stateScroll={false}
                    onClick={() => {}}
                />

                {/* Comptes */}
                <NavItem
                    Icon={MdCabin}
                    text="Comptes"
                    isDropdown={false}
                    stateScroll={false}
                    onClick={() => {}}
                />

                {/* Général */}
                <NavItem
                    Icon={FcAbout}
                    text="General"
                    isDropdown={false}
                    stateScroll={false}
                    onClick={() => {}}
                />

                {/* Sign Up */}
                <NavItem
                    Icon={PiSignInFill}
                    text="Sign Up"
                    isDropdown={false}
                    stateScroll={false}
                    onClick={() => {}}
                />
                </ul>

        </div>
        </aside>
        
        
        {/* <HedearPage/> */}




    </>
};

export default SidebarPage;
