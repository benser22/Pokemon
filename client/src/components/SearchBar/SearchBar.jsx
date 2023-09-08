import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName, getPokemonById } from "../../redux/actions/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar({ setSearchId, setSearchName }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const cleanedInput = input.trim().toLowerCase();
    if (!cleanedInput) return;

    if (!isNaN(cleanedInput)) {
      try {
        await dispatch(getPokemonById(cleanedInput));
      } catch (error) {
        console.log(error.message);
      }

      setSearchId(cleanedInput);
    } else {
      try {
        await dispatch(getPokemonByName(cleanedInput));
      } catch (error) {
        console.log(error.message);
      }
      setSearchName(cleanedInput);
    }
    return setInput("");
  }

  return (
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            id="formSearch"
            type="search"
            className={styles.searchInput}
            placeholder="Pokemon name or id..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            id="buttonsubmitform"
            title="Search Pokémon"
            type="submit"
            className={styles.searchBarBtns}
          >
            Search
          </button>
        </form>
  );
}
