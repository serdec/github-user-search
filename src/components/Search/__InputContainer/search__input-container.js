import React from 'react';
import { string, func } from 'prop-types';
import styles from '../search.module.css';
import Search__Button from '../__Button/search__button';
import Search__Input from '../__Input/search__input';

const noop = () => {};

export const Search__InputContainer = ({
  inputValue = '',
  handleInputChange = noop,
  handleSearch = noop,
} = {}) => {
  return (
    <div className={styles.search__inputContainer}>
      <Search__Input
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        onEnterPress={handleSearch}
      />
      <Search__Button onClick={handleSearch} />
    </div>
  );
};
Search__InputContainer.propTypes = {
  inputValue: string,
  handleSearch: func,
  handleInputChange: func,
};
export default Search__InputContainer;
