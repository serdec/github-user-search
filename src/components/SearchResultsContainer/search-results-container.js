import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import UserCard from '../UserCard/user-card';
import { array } from 'prop-types';
import { getUsers } from '../Users/reducer';

import styles from './search-results-container.module.css';

const mapStateToProps = (state) => ({
  users: getUsers(state),
});

export const SearchResultsContainer = ({ users = [] } = {}) => {
  const [_users, setUsers] = useState([]);

  // Hydrate on refresh
  useEffect(() => {
    setUsers(users);
  }, [users]);

  return (
    <div className={styles.searchResultsContainer}>
      {_users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          className={styles.searchResultsContainer__userCard}
        />
      ))}
    </div>
  );
};

SearchResultsContainer.propTypes = {
  users: array,
};

export default connect(mapStateToProps, null)(SearchResultsContainer);
