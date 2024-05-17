import React from "react";
import { Link } from "react-router-dom";

//Here we implement a Nav component which is going to use React router

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 font-serif">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">MovieApp</Link>
        </div>
        <ul className="flex">
          <li className="text-white hover:text-gray-300">
            <Link to="/">TopMovies</Link>
          </li>
          <li className="text-white hover:text-gray-300 ml-2">
            <Link to="/pie">MovieChart</Link>
          </li>
          <li className="text-white hover:text-gray-300 ml-2">
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
