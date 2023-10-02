import React from "react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  searchGenre,
  setSearchGenre,
  searchSortBy,
  setSearchSortBy,
  setSearchParamsFunc,
  searchPage,
  setSearchPage,
  setQuery,
  setGenre,
  setSort,
  genres,
}) => {
  // Dummy data for categories and sorting options

  const sortingOptions = [{ key: "quantity", value: "Quantity" }];

  return (
    <div className="p-4 bg-gray-100">
      <div className="  max-w-screen-lg mx-auto">
        <div className="  mb-4 flex flex-wrap items-center justify-center px-4  gap-4 ">
          <div className="relative   ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className=" flex-1 w-100 py-2 px-6 pl-10 text-sm  border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => {
                setSearchParamsFunc({ q: e.target.value });
              }}
            />
          </div>
          <div className="flex gap-1 items-center justify-self-end">
            <label className=" w-12 text-gray-600">Genre:</label>
            <select
              value={searchGenre}
              onChange={(e) => {
                setSearchParamsFunc({ genre: e.target.value });
              }}
              className=" px-3 py-2 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            >
              <option value="">All</option>
              {genres.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-1 items-center justify-self-end">
            <label className=" text-gray-600 ">Sort By:</label>
            <select
              value={searchSortBy}
              onChange={(e) => {
                setSearchParamsFunc({ sortBy: e.target.value });
              }}
              className="w-42 px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            >
              <option value="">Updated date</option>
              {sortingOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
