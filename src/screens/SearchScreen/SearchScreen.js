import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults.js";
import { useDispatch, useSelector } from "react-redux";
import { booksFetch } from "../../state/books/booksActions";
const genres = [
  { key: "fiction", value: "Fiction" },
  { key: "novel", value: "Novel" },
  { key: "nonfiction", value: "Nonfiction" },
  { key: "poetry", value: "Poetry" },
  { key: "other", value: "Other" },
];
export default function SearchScreen() {
  const state = useSelector((state) => state.books);
  const { fetchBooksError, fetchBooksLoading } = state;
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const query = searchParams.get("q");
  const genre = searchParams.get("genre");
  const sortBy = searchParams.get("sortBy");
  const page = searchParams.get("page");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchGenre, setSearchGenre] = React.useState("");
  const [searchSortBy, setSearchSortBy] = React.useState("");
  const [searchPage, setSearchPage] = React.useState(1);

  React.useEffect(() => {
    setSearchQuery(query);
    setSearchGenre(genre);
    setSearchSortBy(sortBy);
    setSearchPage(page);
    let qQuery = query && query !== "null" ? query : "";
    let genreQuery = genre && genre !== "null" ? genre : "";
    let sortByQuery = sortBy && sortBy !== "null" ? sortBy : "";
    let pageQuery = page && page !== "null" ? page : 1;
    setSearchParams(
      new URLSearchParams({
        q: qQuery,
        genre: genreQuery,
        sortBy: sortByQuery,
        page: pageQuery,
      }).toString()
    );
  }, [query, genre, sortBy, page, setSearchParams]);

  const setSearchParamsFunc = (params) => {
    let qQuery = query && query !== "null" ? query : "";
    let genreQuery = genre && genre !== "null" ? genre : "";
    let sortByQuery = sortBy && sortBy !== "null" ? sortBy : "";
    let pageQuery = page && page !== "null" ? page : 1;
    const str = new URLSearchParams({
      q: qQuery,
      genre: genreQuery,
      sortBy: sortByQuery,
      page: pageQuery,
      ...params,
    }).toString();
    setSearchParams(str);
  };
  const fetch = React.useCallback(
    (query) => {
      dispatch(booksFetch(query));
    },
    [dispatch]
  );
  React.useEffect(() => {
    fetch({ query: query, genre: genre, sortBy: sortBy, page: page });
  }, [fetch, page, genre, sortBy, query, dispatch]);

  return (
    <div className="  ">
      <SearchBar
        searchQuery={searchQuery}
        searchGenre={searchGenre}
        searchSortBy={searchSortBy}
        searchPage={searchPage}
        genres={genres}
        setSearchParamsFunc={setSearchParamsFunc}
      />
      {fetchBooksError && (
        <div className="mt-12 text-red-600">
          Error fetching books, Please try again.
        </div>
      )}
      {fetchBooksLoading ? (
        <div className="mt-12">Loading...</div>
      ) : (
        <SearchResults
          searchPage={searchPage}
          setSearchParamsFunc={setSearchParamsFunc}
          genres={genres}
          state={state}
        />
      )}
    </div>
  );
}
