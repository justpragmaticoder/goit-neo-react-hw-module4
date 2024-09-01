import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-hot-toast";

import styles from "./SearchBar.module.css";
import { sanitizeString } from "../../utils/string-utils.js";

const DEFAULT_SEARCH_PLACEHOLDER_VALUE = 'Search images and photos';

const SearchBar = ({ searchHandler }) => {
  const validateSearchQuery = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value;

    if (sanitizeString(searchQuery) === "") {
      toast.error("Plz, add your search query first!", { icon: "🔍" });
    } else {
      searchHandler(searchQuery);
    }
  };
  return (
    <div>
      <header className={styles.header}>
        <form className={styles.searchForm} onSubmit={validateSearchQuery}>
          <input
            className={styles.searchFormInput}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder={DEFAULT_SEARCH_PLACEHOLDER_VALUE}
          />
          <button className={styles.searchFormBtn} type="submit">
            <AiOutlineSearch />
          </button>
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
