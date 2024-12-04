import Link from "next/link";
import React from "react";

function FooterLayout(props) {
  return (
    <div className="flex justify-between items-end fixed bottom-0 w-full px-8 py-2 bg-[#E5E5E5] dark:bg-[#505050] dark:text-white">
        <p className="hidden lg:block text-lg font-[MontserratSB] motion-reduce:transition-all duration-700 ease-out">
          FS-NDERE       |
          <span className="text-sm">
            <a href={"#"} className="hover:text-blue-700">
            &copy; Faculte Des Sciences 
            </a>
            . Tous droits reserves.
          </span>
        </p>
      
    </div>
  );
}

export default FooterLayout;