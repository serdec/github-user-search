import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import { SearchResultsContainer } from './search-results-container';
import styles from './search-results-container.module.css';

describe('search-results-container', async (assert) => {
  const createSearchResultsContainer = () => render(<SearchResultsContainer />);

  {
    const $ = createSearchResultsContainer();
    assert({
      given: 'no arguments',
      should: 'render the search results',
      expected: 1,
      actual: $(`.${styles.searchResultsContainer}`).length,
    });
  }
});
