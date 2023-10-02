// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ currentPage }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-gray-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div
          onClick={() => {
            navigate("/search");
          }}
          className="flex items-center cursor-pointer"
        >
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
            Book Store
          </span>
        </div>
        <nav className="space-x-4">
          <button
            onClick={() => {
              navigate("/search");
            }}
            className=" py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
          >
            Search{" "}
          </button>
          <button
            onClick={() => {
              navigate("/book/new");
            }}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Create Book
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
