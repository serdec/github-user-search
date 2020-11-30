import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import Search__Button from './search__button';
import styles from '../search.module.css';

describe('search__button', async (assert) => {
  const createSearch__Button = () => render(<Search__Button />);
  {
    const $ = createSearch__Button();
    assert({
      given: 'no arguments',
      should: 'render the search button',
      expected: 1,
      actual: $(`.${styles.search__button}`).length,
    });
  }
});
