import React from 'react';
import { describe } from 'riteway';
import render from 'riteway/render-component';
import match from 'riteway/match';
import SearchResultsContainer__UsersList from './search-results-container__users-list';
import styles from '../search-results-container.module.css';
import { createUser } from '../../Users/reducer';

describe('searchResultsConatiner__UsersList', async (assert) => {
  const createSearchResultsContainer__UsersList = ({ users = [] } = {}) =>
    render(<SearchResultsContainer__UsersList users={users} />);

  {
    const $ = createSearchResultsContainer__UsersList();
    assert({
      given: 'no arguments',
      should: 'render the users list component',
      expected: 1,
      actual: $(`.${styles.searchResultsContainer__usersList}`).length,
    });
  }
  {
    const users = [createUser({ id: 1 }), createUser({ id: 2 })];
    const $ = createSearchResultsContainer__UsersList({ users });
    const contains = match($.html());
    assert({
      given: 'a list of users',
      should: 'render the first user',
      expected: users[0].id.toString(),
      actual: contains(users[0].id),
    });
    assert({
      given: 'a list of users',
      should: 'render the second user',
      expected: users[1].id.toString(),
      actual: contains(users[1].id),
    });
  }
});
