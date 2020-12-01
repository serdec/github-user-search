import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import { SearchResultsContainer } from './search-results-container';
import styles from './search-results-container.module.css';
import { createPages } from '../Users/reducer';

describe('search-results-container', async (assert) => {
  const createSearchResultsContainer = ({
    users = [],
    total_count = 0,
    pages = createPages(),
  } = {}) =>
    render(
      <SearchResultsContainer
        users={users}
        total_count={total_count}
        pages={pages}
      />
    );

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
