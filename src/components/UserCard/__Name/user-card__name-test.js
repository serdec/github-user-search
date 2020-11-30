import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import UserCard__Name from './user-card__name';
import styles from '../user-card.module.css';

describe('userCard__name', async (assert) => {
  const createUserCard__Name = ({ name = '' } = {}) =>
    render(<UserCard__Name name={name} />);

  {
    const $ = createUserCard__Name();
    assert({
      given: 'no arguments',
      should: 'render the user card name component',
      expected: 1,
      actual: $(`.${styles.userCard__name}`).length,
    });
  }

  {
    const name = 'Example';
    const $ = createUserCard__Name({ name });
    const contains = match($.html());

    assert({
      given: 'a name',
      should: 'render the user card with the name',
      expected: name,
      actual: contains(name),
    });
  }
});
