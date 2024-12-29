import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
export default function DetailModal({ open, onClose,onDeleted, title, children }) {
  if (!open) return null;
  const [showActionButton, setShowActionButton] = useState(true);

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center w-full h-full bg-opacity-75 bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center bg-[#002157] justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl text-white font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
             <RiCloseFill
                type="button"
                onClick={onClose}
                className="absolute top-3 end-2.5 text-gray-400 text-2xl hover:text-red-500 hover:text-5xl rounded-lg  w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            />
          </div>

          {/* Contenu du modal */}
          <div className="p-4 md:p-5 text-center">
            <div className="mb-5 text-gray-500 dark:text-gray-400">{children}</div>

            {/* Boutons d'action */}
            {showActionButton ? (
              <div className="flex justify-center gap-3">
                <FiEdit 
                  onClick={onClose}
                  className="m-3 text-blue-500 text-4xl hover:text-green-500"
                />
                <RiDeleteBin6Line 
                  onClick={() => setShowActionButton(false)}
                  className="m-3 text-red-300 text-4xl hover:text-red-500"
                />
              </div>
            ):(
                <div className="flex">
                  <p className="text-red-500">Cette action est irreverssible. Continuer ?</p>
                  
                  <button 
                    onClick={() => {onDeleted(); onClose()}}
                    className="text-white bg-red-300 w-9 h-6 mx-2  rounded-lg hover:bg-red-500 "
                  >Oui
                  </button>
                  <button 
                    onClick={() => {setShowActionButton(true)}}
                    className="text-white bg-yellow-500 w-9 h-6 mx-2  rounded-lg hover:bg-gray-500 "
                  >Non
                  </button>
                    
                </div>
              )
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}
