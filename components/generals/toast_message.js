import React, { useState } from "react";

const Toast = ({ message, color = "blue", onClose }) => {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    gray: "bg-gray-500",
    orange: "bg-orange-500"
  };

  return (
    <div
      className={`fixed z-50 max-w-md left-1/2 top-5 -translate-x-1/2  w-full flex items-center text-white px-2 py-2 transition delay-150 rounded shadow-lg ${colors[color]}`}
    >
      <span className="mr-4">{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 focus:outline-none"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
