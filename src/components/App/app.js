import React, { useState } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import Search from '../Search/search';
import SearchResultsContainer from '../SearchResultsContainer/search-results-container';
import { getUsers_sagaAction } from '../Users/saga';
import styles from './app.module.css';

const mapDispatchToProps = {
  getUsers: getUsers_sagaAction,
};
const noop = () => {};

const App = ({ getUsers = noop } = {}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const content = e.target.value;
    setInputValue(content);
  };

  const handleSearch = async ({ page = 1 } = {}) => {
    getUsers({ q: inputValue, page });
  };
  return (
    <div className={styles.appContainer}>
      <Search
        inputValue={inputValue}
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
      />
      <SearchResultsContainer handleSearch={handleSearch} />
    </div>
  );
};

App.propTypes = {
  getUsers: func,
};

export default connect(null, mapDispatchToProps)(App);
