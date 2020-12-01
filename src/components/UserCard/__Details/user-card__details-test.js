import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import UserCard__Details from './user-card__details';
import styles from '../user-card.module.css';
import { createUser } from '../../Users/reducer';

describe('userCard__details', async (assert) => {
  const createUserCard__Details = ({ user = createUser() } = {}) =>
    render(<UserCard__Details user={user} />);

  {
    const $ = createUserCard__Details();
    assert({
      given: 'no arguments',
      should: 'render the user card name component',
      expected: 1,
      actual: $(`.${styles.userCard__details}`).length,
    });
  }

  {
    const name = 'ExampleName';
    const html_url = '/ExampleUrl';
    const login = 'ExampleLogin';
    const bio = 'ExampleBio';
    const user = createUser({
      name,
      html_url,
      login,
      bio,
    });
    const $ = createUserCard__Details({ user });
    const contains = match($.html());

    assert({
      given: 'a name',
      should: 'render the user card with the name',
      expected: name,
      actual: contains(name),
    });
    assert({
      given: 'a html url',
      should: 'render the user card with the url',
      expected: html_url,
      actual: contains(html_url),
    });
    assert({
      given: 'a login',
      should: 'render the user card with the login',
      expected: login,
      actual: contains(login),
    });
    assert({
      given: 'a bio',
      should: 'render the user card with the bio',
      expected: bio,
      actual: contains(bio),
    });
  }
});
