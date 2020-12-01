import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import UserCard__ProfilePicture from './user-card__profile-picture';
import styles from '../user-card.module.css';

describe('userCard__profilePicture', async (assert) => {
  const createUserCard__ProfilePicture = ({ img = '' } = {}) =>
    render(<UserCard__ProfilePicture img={img} />);

  {
    const $ = createUserCard__ProfilePicture();
    assert({
      given: 'no arguments',
      should: 'render the profile picture component',
      expected: 1,
      actual: $(`.${styles.userCard__profilePicture}`).length,
    });
  }
  {
    const img = 'customImage.png';
    const $ = createUserCard__ProfilePicture({ img });
    const contains = match($.html());
    assert({
      given: 'no arguments',
      should: 'render the profile picture',
      expected: img,
      actual: contains(img),
    });
  }
});
