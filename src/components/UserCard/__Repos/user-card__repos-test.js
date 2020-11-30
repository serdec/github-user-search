import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import UserCard__Repos from './user-card__repos';
import styles from '../user-card.module.css';

describe('userCard__repos', async (assert) => {
  const createUserCard__Repos = ({ repos = [] } = {}) =>
    render(<UserCard__Repos repos={repos} />);
  {
    const $ = createUserCard__Repos();
    assert({
      given: 'no arguments',
      should: 'render the repos container',
      expected: 1,
      actual: $(`.${styles.userCard__repos}`).length,
    });
  }
  {
    const repos = [{ id: 1, name: 'example' }];
    const $ = createUserCard__Repos({ repos });
    const contains = match($.html());
    assert({
      given: 'no arguments',
      should: 'render the repos names',
      expected: repos[0].name,
      actual: contains(repos[0].name),
    });
  }
});
