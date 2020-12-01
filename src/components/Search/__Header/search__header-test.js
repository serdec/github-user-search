import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import Search__Header from './search__header';
import styles from '../search.module.css';

describe('search__header', async (assert) => {
  const createSearch__Header = () => render(<Search__Header />);

  {
    const $ = createSearch__Header();

    assert({
      given: 'no arguments',
      should: 'render the search header',
      expected: 1,
      actual: $(`.${styles.search__header}`).length,
    });
  }
});
