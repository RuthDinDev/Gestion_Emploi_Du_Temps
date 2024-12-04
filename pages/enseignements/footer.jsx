import Link from "next/link";
import React from "react";

function FooterLayout(props) {
  return (
    <div className="flex justify-between items-center px-8 py-2 bg-[#E5E5E5] dark:bg-[#505050] dark:text-white">
      <Link href={"/"} className="">
        <p className="hidden lg:block text-lg font-[MontserratSB] motion-reduce:transition-all duration-700 ease-out">
          SMASY
        </p>
      </Link>
      <p className="text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <Link href={"https://dailylearn.org"} className="hover:text-blue-700">
          Daily Learning
        </Link>
        . Tous droits reserves.
      </p>
    </div>
  );
}

export default FooterLayout;
