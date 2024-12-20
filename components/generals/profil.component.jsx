import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

export default function Profil({ closeModal}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleProfilModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={`absolute z-50 top-20 right-5 flex flex-col items-center justify-center gap-y-4 w-full lg:w-[20vw] p-4 rounded-md bg-white dark:bg-[#18181b] shadow-md animate-slideIn`}>
      <div className="px-4 py-3 flex flex-col items-center justify-center" role="none">
          <button type="button" className="text-sm rounded-full dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
              <img className="w-20 h-20 rounded-full" src="/images/mon_profil.jpeg" alt="Profil"/>
          </button>
          <button type="button" onClick={closeModal} className="absolute top-1 right-1 end-2.5 text-gray-400 bg-transparent hover:text-red-500 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
              <IoMdClose className="text-sm hover:text-2xl absolute top-1 right-2 end-2.5 text-gray-400 bg-transparent hover:text-red-500 rounded-lg w-5 h-5 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"/>
          </button>
          <p className="text-xl text-gray-900 dark:text-white" role="none">The Peace</p>
          <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">thepeace@gmail.com</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4 w-full mt-5">
            <button
            className="flex gap-x-2 items-center justify-center w-full py-2 rounded-md bg-[#E5E5E5] dark:bg-[#505050] hover:bg-[#B3B3B3] dark:hover:bg-[#363636] hover:text-white text-center transition delay-150 ease-in-out"
            onClick={() => {}}
            >
            Changer de compte
            </button>
            <button
            className="flex gap-x-2 items-center justify-center w-full py-2 rounded-md border-2 border-[#FF002C] text-[#FF002C] hover:text-white text-center hover:bg-[#FF002C] transition delay-150 ease-in-out"
            onClick={() => {}}
            >
            Deconnexion
            </button>
        </div>
  </div>
  );
}
