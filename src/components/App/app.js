import React from 'react';
import Search from '../Search/search';
import SearchResultsContainer from '../SearchResultsContainer/search-results-container';
import styles from './app.module.css';
const App = () => (
  <div className={styles.appContainer}>
    <Search />
    <SearchResultsContainer />
  </div>
);

export default App;
