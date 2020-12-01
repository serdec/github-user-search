import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import SearchResultsContainer__UsersCount from './search-results-container__users-count';
import styles from '../search-results-container.module.css';

describe('searchResultsContainer__UserCount', async (assert) => {
  const createSearchResultsContainer__UserCount = ({ total_count = 0 } = {}) =>
    render(<SearchResultsContainer__UsersCount total_count={total_count} />);

  {
    const $ = createSearchResultsContainer__UserCount();
    assert({
      given: 'no arguments',
      should: 'render the user count component',
      expected: 1,
      actual: $(`.${styles.searchResultsContainer__userCount}`).length,
    });
  }
  {
    const total_count = 15;
    const $ = createSearchResultsContainer__UserCount({ total_count });
    const contains = match($.html());
    assert({
      given: 'a total count',
      should: 'render the  total count',
      expected: total_count.toString(),
      actual: contains(total_count),
    });
  }
});
