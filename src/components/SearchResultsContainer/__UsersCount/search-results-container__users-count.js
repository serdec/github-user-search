import React from 'react';
import { number } from 'prop-types';
import styles from '../search-results-container.module.css';

const SearchResultsContainer__UsersCount = ({ total_count = 0 } = {}) => (
  <div className={styles.searchResultsContainer__userCount}>
    {total_count} users
  </div>
);

SearchResultsContainer__UsersCount.propTypes = {
  total_count: number,
};
export default SearchResultsContainer__UsersCount;
