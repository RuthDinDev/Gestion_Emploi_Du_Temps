import { FaAngleDown, FaAngleRight } from "react-icons/fa";

const NavItem = ({
  Icon,
  text,
  count,
  isDropdown,
  stateScroll,
  index,
  onClick,
  subItems = [], // Liste des sous-composants à afficher
}) => {
  return (
    <li>
      <button
        onClick={() => onClick(index)} // Utilisation de props.onClick
        type="button"
        className={`${
          stateScroll ? "bg-blue-700 hover:bg-blue-700" : ""
        } flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700`}
      >
        <Icon className="text-2xl text-black" />
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          {text}
        </span>
        {count && (
          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {count}
          </span>
        )}
        {isDropdown && (stateScroll ? <FaAngleDown /> : <FaAngleRight />)}
      </button>
      {stateScroll && isDropdown && subItems.length > 0 && (
        <ul id="dropdown-example" className="py-2 space-y-2">
          {subItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.link || "#"} // Par défaut, le lien est `#` si non spécifié
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-300 dark:text-white dark:hover:bg-gray-700"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default NavItem;
