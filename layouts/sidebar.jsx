import clsx from 'clsx';

import { RiSchoolLine } from "react-icons/ri";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { BiBookBookmark } from "react-icons/bi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { MdOutlineAccountTree } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import React, { useState } from 'react';
import { FcAbout } from "react-icons/fc";
import { PiSignInFill } from "react-icons/pi";
import NavItem from '@/components/generals/navigationItems';
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

        <aside id="logo-sidebar" className={`fixed ${stateModeChange
            ? "rounded-lg bg-gray-800 dark:border-gray-700" 
            : "bg-gray-200"}  
            w-[255px] top-0 left-0 z-40 w-65 h-screen pt-5 transition-transform -translate-x-full bg-white  sm:translate-x-0 `} aria-label="Sidebar">
            <div className="">
              <a href="#" className="flex-row md:me-24">
                <div className="flex ">
                    <img src="/images/logoFS.png" className="h-11 me-3 ml-2 animate-zoom" alt="Logo FS" />
                    <p className="text-[#800010] self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                        FS-SCHEDULE
                    </p>
                </div>
                {/* <div className="text-orange-400  ml-10 self-center text-xl font-semibold sm:text-xl whitespace-nowrap dark:text-white">FS NDERE</div> */}
              </a>   
            </div>
                     
            <div className={`${stateModeChange ? "bg-gray-800" : "bg-gray-200"} h-full p-3 pb-4 rounded-lg overflow-y-auto  `}>
            <ul>
                {/* Dashboard */}
                <a href="/dashboard/dashboard">
                     <NavItem
                        Icon={GoHome}
                        // iconColor="text-blue-700"
                        text="Dashboard"
                        isDropdown={false}
                        stateScroll={false}
                        onClick={() => {}}
                    />
                </a>
               

                {/* Planifications */}
                <a href="/planification/planification">
                    <NavItem
                        Icon={RiCalendarScheduleLine}
                        // iconColor="text-red-500"
                        text="Planifications"
                        count="3"
                        isDropdown={false}
                        stateScroll={false}
                        onClick={() => {}}
                    />
                </a>
                

                {/* Personnels */}
                {/* <NavItem
                    Icon={RiTeamLine}
                    // iconColor="text-blue-700"
                    text="Personnels"
                    isDropdown={true}
                    stateScroll={openDropdown === "personnels"}
                    onClick={toggleScroll}
                    index="personnels"
                    subItems={[
                        { label: "Overview", link: "/personnels/overview" },
                        { label: "Enseignant", link: "/personnels/enseignant" },
                    ]}
                /> */}

                {/* Enseignements */}
                <NavItem
                    Icon={BiBookBookmark}
                    // iconColor="text-green-700"
                    text="Enseignements"
                    isDropdown={true}
                    stateScroll={openDropdown === "enseignements"}
                    onClick={toggleScroll}
                    index="enseignements"
                    subItems={[
                        { label: "Enseignant", link: "/enseignements/enseignant" },
                        { label: "Unites UEs", link: "/enseignements/ue" },
                        { label: "Affectation", link: "/enseignements/affectation" },
                    ]}
                />

                {/* Formations */}
                <a href="/formations/formation">
                    <NavItem
                        Icon={MdOutlineAccountTree}
                        // iconColor="text-yellow-500"
                        text="Formations"
                        isDropdown={false}
                        count=""
                        stateScroll={false}
                        onClick={() => {}}
                    />
                </a>
                

                {/* Salles */}
                <a href="/sales/salle">
                    <NavItem
                        Icon={RiSchoolLine}
                        text="Salles"
                        isDropdown={false}
                        stateScroll={false}
                        onClick={() => {}}
                    />
                </a>
                

                {/* Comptes */}
                <NavItem
                    Icon={MdOutlineManageAccounts}
                    // iconColor="text-red-500"
                    text="Comptes"
                    isDropdown={false}
                    stateScroll={false}
                    onClick={() => {}}
                />

                {/* Général */}
                <NavItem
                    Icon={RiDashboardHorizontalLine}
                    // iconColor="text-blue-700"
                    text="General"
                    isDropdown={false}
                    stateScroll={false}
                    onClick={() => {}}
                />

                {/* Sign Up */}
                <NavItem
                    Icon={PiSignInFill}
                    // iconColor="text-red-500"
                    text="Sign Up"
                    isDropdown={false}
                    stateScroll={false}
                    onClick={() => {}}
                />
                <div className="mb-10"></div>
                <div className={`w-4/5 h-px -ml-3  bg-gray-400`}></div>
                    {/* A propos */}
                    <NavItem
                        Icon={FcAbout}
                        text="A propos"
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
