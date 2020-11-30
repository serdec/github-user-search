import { Octokit } from '@octokit/rest';
import { describe } from 'riteway';
import { getUsers_saga, getUsers_sagaAction, watchGetUsers } from './saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { createRepo, createUser, setUsers } from './reducer';

const createOctokit = () => new Octokit();
const createQuery = ({ q = '', page = 1 } = {}) => ({
  q,
  page,
});

describe('search saga', async (assert) => {
  {
    const iterator = watchGetUsers();
    assert({
      given: 'an action to get users',
      should: 'call the get users saga',
      expected: takeEvery(getUsers_sagaAction.type, getUsers_saga),
      actual: iterator.next().value,
    });
  }
  {
    const users = [createUser({ id: 1 }), createUser({ id: 2 })];
    let userResponse = { data: { items: users } };
    let repoResponse = [
      { data: [{ owner: { id: 1 } }] },
      { data: [{ owner: { id: 2 } }] },
    ];
    const octokit = createOctokit();
    const query = createQuery({ q: 'example' });
    const getUsersAction = getUsers_sagaAction(query);
    const iterator = getUsers_saga(getUsersAction);

    // BUG in riteway, if we don't JSON.stringify we get a syntax error
    const expected = JSON.stringify(
      call(octokit.search.users, getUsersAction.payload)
    );
    const actual = JSON.stringify(iterator.next().value);
    assert({
      given: 'a query',
      should: 'fetch the results',
      expected,
      actual,
    });
    assert({
      given: 'a response from the server',
      should: 'save the retrieved users in state',
      expected: put(setUsers(users)),
      actual: iterator.next(userResponse).value,
    });
    assert({
      given: 'a list of users from the response of the server',
      should: 'retrieve repos info for each user',
      expected: JSON.stringify(
        all([
          call(octokit.repos.listForUser, {
            username: users[0].login,
            sort: 'updated',
          }),
          call(octokit.repos.listForUser, {
            username: users[1].login,
            sort: 'updated',
          }),
        ])
      ),
      actual: JSON.stringify(iterator.next().value),
    });
    // update the users repositories
    users[0].repos = [createRepo(repoResponse[0].data[0])];
    users[1].repos = [createRepo(repoResponse[1].data[0])];
    assert({
      given: 'a list of updated users',
      should: 'update them again in the state',
      expected: put(setUsers(users)),
      actual: iterator.next(repoResponse).value,
    });
  }
});
