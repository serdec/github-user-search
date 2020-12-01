import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import Pagination from './pagination';
import styles from './pagination.module.css';
import { createPages } from '../Users/reducer';

describe('pagination', async (assert) => {
  const createPagination = ({ pages = createPages() }) =>
    render(<Pagination pages={pages} />);

  {
    const pages = {
      prev: {},
      next: { page: '2' },
      last: { page: '4' },
      first: {},
      current: { page: '1' },
    };
    const $ = createPagination({ pages });
    assert({
      given: 'a paginated result',
      should: 'render the pagination component',
      expected: 1,
      actual: $(`.${styles.pagination}`).length,
    });
  }
  {
    const pages = {
      prev: {},
      next: { page: '2' },
      last: { page: '4' },
      first: {},
      current: { page: '1' },
    };
    const $ = createPagination({ pages });
    const contains = match($(`.${styles.pagination}`).html());
    assert({
      given: 'a pages object',
      should: 'render the last page',
      expected: pages.last.page,
      actual: contains(pages.last.page),
    });
  }
  {
    const pages = createPages();
    const $ = createPagination({ pages });
    const contains = match($.html());
    assert({
      given: 'a pages object',
      should: 'render the last page',
      expected: '',
      actual: contains(pages.last.page),
    });
  }
});
