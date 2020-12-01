import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import Search__Input from './search__input.js';
import styles from '../search.module.css';

describe('search__input', async (assert) => {
  const createSearch__Input = () => render(<Search__Input />);

  {
    const $ = createSearch__Input();

    assert({
      given: 'no arguments',
      should: 'render the input form',
      expected: 1,
      actual: $(`.${styles.search__input}`).length,
    });
  }
});
