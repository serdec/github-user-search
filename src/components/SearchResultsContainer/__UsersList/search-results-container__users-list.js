import React from 'react';
import { array } from 'prop-types';
import styles from '../search-results-container.module.css';
import UserCard from '../../UserCard/user-card';

const SearchResultsContainer__UsersList = ({ users = [] } = {}) => (
  <div className={styles.searchResultsContainer__usersList}>
    {users.map((user) => (
      <UserCard
        key={user.id}
        user={user}
        className={styles.searchResultsContainer__userCard}
      />
    ))}
  </div>
);

SearchResultsContainer__UsersList.propTypes = {
  users: array,
};
export default SearchResultsContainer__UsersList;
