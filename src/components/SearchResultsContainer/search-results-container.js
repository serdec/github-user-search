import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { array, object, number, func, bool } from 'prop-types';
import {
  createPages,
  getLoading,
  getPages,
  getTotalCount,
  getUsers,
} from '../Users/reducer';

import styles from './search-results-container.module.css';
import SearchResultsContainer__UsersCount from './__UsersCount/search-results-container__users-count';
import Pagination from '../Pagination/pagination';
import SearchResultsContainer__UsersList from './__UsersList/search-results-container__users-list';

const noop = () => {};
const mapStateToProps = (state) => ({
  users: getUsers(state),
  pages: getPages(state),
  total_count: getTotalCount(state),
  loading: getLoading(state),
});

export const SearchResultsContainer = ({
  users = [],
  pages = createPages(),
  total_count = 0,
  loading = false,
  handleSearch = noop,
} = {}) => {
  const [_users, setUsers] = useState([]);
  const [_total_count, setTotalCount] = useState(0);
  const [_pages, setPages] = useState(createPages());
  const [_loading, setLoading] = useState(false);

  // Hydrate on refresh
  useEffect(() => {
    setUsers(users);
    setTotalCount(total_count);
    setPages(pages);
    setLoading(loading);
  }, [users, total_count, pages, loading]);

  return (
    <div className={styles.searchResultsContainer}>
      {_loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <SearchResultsContainer__UsersCount total_count={_total_count} />
          <SearchResultsContainer__UsersList users={_users} />
          <Pagination pages={_pages} handleSearch={handleSearch} />
        </>
      )}
    </div>
  );
};

SearchResultsContainer.propTypes = {
  users: array,
  pages: object,
  total_count: number,
  loading: bool,
  handleSearch: func,
};

export default connect(mapStateToProps, null)(SearchResultsContainer);
