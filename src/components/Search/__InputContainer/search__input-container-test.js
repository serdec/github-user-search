import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import { Search__InputContainer } from './search__input-container';
import styles from '../search.module.css';

describe('search__inputContainer', async (assert) => {
  const createSearch__InputContainer = () => render(<Search__InputContainer />);
  {
    const $ = createSearch__InputContainer();
    assert({
      given: 'no arguments',
      should: 'render the input container',
      expected: 1,
      actual: $(`.${styles.search__inputContainer}`).length,
    });
  }
});
