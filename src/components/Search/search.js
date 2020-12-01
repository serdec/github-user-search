import React from 'react';
import { string, func } from 'prop-types';
import styles from './search.module.css';
import Search__Header from './__Header/search__header';
import Search__InputContainer from './__InputContainer/search__input-container';

const noop = () => {};

const Search = ({
  inputValue = '',
  handleInputChange = noop,
  handleSearch = noop,
} = {}) => {
  return (
    <div className={styles.search}>
      <Search__Header />
      <Search__InputContainer
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
    </div>
  );
};

Search.propTypes = {
  inputValue: string,
  handleSearch: func,
  handleInputChange: func,
};
export default Search;
