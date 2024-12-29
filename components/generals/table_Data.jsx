import React from "react";

const DataTable = ({ data, headers, rowKey, onRowClick }) => {
  if (!Array.isArray(data) || !Array.isArray(headers)) {
    console.error("Les données ou les en-têtes sont mal définis !");
    return null;
  }

  return (
    <div className="bg-gray-200 shadow rounded-lg">
      {/* En-tête */}
      <div className="bg-gray-100 text-gray-800 font-semibold flex justify-between py-2 px-4 rounded-t-lg">
        {headers.map((header, index) => (
          <p key={index} className={`w-1/${headers.length}`}>
            {header.label}
          </p>
        ))}
      </div>

      {/* Liste */}
      <ul className="divide-y divide-gray-100">
        {data.map((item, idx) => (
          item ? (
            <li
              key={item[rowKey] || idx}
              className="flex justify-between bg-white items-center transition-75 py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => onRowClick(item)}
            >
              {headers.map((header, index) => (
                <p key={index} className={`w-1/${headers.length} text-lg text-gray-500`}>
                  {item[header.key] || "_"}
                </p>
              ))}
            </li>
          ) : null
        ))}
      </ul>
    </div>
  );
};

export default DataTable;
