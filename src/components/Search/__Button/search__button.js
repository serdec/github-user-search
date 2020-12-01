import React from 'react';
import { func } from 'prop-types';
import styles from '../search.module.css';

const noop = () => {};

const Search__Button = ({ onClick = noop } = {}) => {
  return (
    <button className={styles.search__button} onClick={onClick}>
      Search
    </button>
  );
};

Search__Button.propTypes = {
  onClick: func,
};
export default Search__Button;
