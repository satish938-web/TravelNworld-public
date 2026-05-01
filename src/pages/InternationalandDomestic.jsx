import React from "react";
import { Link } from "react-router-dom";

const InternationandDomestic = () => {
  return (
    <li className="relative group list-none">
      {/* Dropdown Trigger */}
      <span className="hover:text-[#eb6734] text-base font-semibold cursor-pointer">
        Destination
      </span>

      {/* Dropdown Menu */}
      <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <li>
          <Link
            to="/international"
            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
          >
            International
          </Link>
        </li>
        <li>
          <Link
            to="/domestic"
            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
          >
            Domestic
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default InternationandDomestic;
