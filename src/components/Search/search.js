import React from 'react';
import styles from './search.module.css';
import Search__Header from './__Header/search__header';
import Search__InputContainer from './__InputContainer/search__input-container';

const Search = () => {
  return (
    <div className={styles.search}>
      <Search__Header />
      <Search__InputContainer />
    </div>
  );
};
export default Search;
