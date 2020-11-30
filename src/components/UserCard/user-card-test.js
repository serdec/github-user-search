import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import UserCard from './user-card';
import styles from './user-card.module.css';

describe('userCard', async (assert) => {
  const createUserCard = ({ user = {}, className = '' } = {}) =>
    render(<UserCard user={user} className={className} />);
  {
    const $ = createUserCard();
    assert({
      given: 'no arguments',
      should: 'render a user card',
      expected: 1,
      actual: $(`.${styles.userCard}`).length,
    });
  }
  {
    const className = 'customClass';
    const $ = createUserCard({ className });
    const contains = match($.html());

    assert({
      given: 'a custom class',
      should: 'render the user card with the class',
      expected: className,
      actual: contains(className),
    });
  }
});
