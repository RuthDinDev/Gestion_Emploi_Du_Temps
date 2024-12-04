import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

export default function Profil({ closeModal}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleProfilModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={`z-50 absolute top-20 right-4 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user`}>
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
      <ul className="py-1" role="none">
          <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
          </li>
          <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
          </li>
          <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
          </li>
          <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
          </li>
      </ul>
  </div>
  );
}
