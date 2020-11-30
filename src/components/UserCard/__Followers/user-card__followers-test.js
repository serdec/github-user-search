import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import UserCard__Followers from './user-card__followers';
import styles from '../user-card.module.css';

describe('userCard__followes', async (assert) => {
  const createUserCard__Followers = ({ followers = 0 } = {}) =>
    render(<UserCard__Followers followers={followers} />);

  {
    const $ = createUserCard__Followers();
    assert({
      given: 'no arguments',
      should: 'render the followers section',
      expected: 1,
      actual: $(`.${styles.userCard__followers}`).length,
    });
  }
  {
    const followers = 339;
    const $ = createUserCard__Followers({ followers });
    const contains = match($.html());
    assert({
      given: 'no arguments',
      should: 'render the followers number',
      expected: followers.toString(),
      actual: contains(followers),
    });
  }
});
