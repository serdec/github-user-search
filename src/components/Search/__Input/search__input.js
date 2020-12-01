import React from 'react';
import { string, func } from 'prop-types';
import styles from '../search.module.css';

const noop = () => {};

const Search__Input = ({
  inputValue = '',
  handleInputChange = noop,
  onEnterPress = noop,
} = {}) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onEnterPress();
    }
  };
  return (
    <input
      className={styles.search__input}
      placeholder={'Search GitHub Users'}
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
    />
  );
};

Search__Input.propTypes = {
  inputValue: string,
  handleInputChange: func,
  onEnterPress: func,
};

export default Search__Input;
