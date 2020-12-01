import { describe } from 'riteway';
import {
  getUsers_saga,
  getUsers_sagaAction,
  initOctokit,
  watchGetUsers,
} from './saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  createRepo,
  createUser,
  setLoading,
  setPages,
  setTotalCount,
  setUsers,
} from './reducer';
import { Octokit } from '@octokit/rest';

initOctokit();
const createOctokit = () => new Octokit();
const createQuery = ({ q = '', page = 1 } = {}) => ({
  q,
  page,
});

describe('users saga', async (assert) => {
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
    const total_count = 2;
    const users = [
      createUser({ id: 1, login: '1' }),
      createUser({ id: 2, login: '2' }),
    ];
    let userResponse = { data: { items: users, total_count }, headers: {} };
    let userDetails = [{ data: users[0] }, { data: users[1] }];
    let repoResponse = [
      { data: [{ owner: { id: 1 } }] },
      { data: [{ owner: { id: 2 } }] },
    ];
    const octokit = createOctokit();
    const query = createQuery({ q: 'example' });
    const getUsersAction = getUsers_sagaAction(query);
    const iterator = getUsers_saga(getUsersAction);

    assert({
      given: 'a query',
      should: 'set the loading state to true',
      expected: put(setLoading(true)),
      actual: iterator.next().value,
    });

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
      should: 'set the results total count',
      expected: put(setTotalCount(total_count)),
      actual: iterator.next(userResponse).value,
    });
    assert({
      given: 'a response from the server',
      should: 'save the pages',
      expected: put(setPages({})),
      actual: iterator.next().value,
    });
    assert({
      given: 'a response from the server',
      should: 'get the users details',
      expected: JSON.stringify(
        all([
          call(octokit.users.getByUsername, { username: users[0].login }),
          call(octokit.users.getByUsername, { username: users[1].login }),
        ])
      ),
      actual: JSON.stringify(iterator.next().value),
    });
    assert({
      given: 'a response from the server',
      should: 'save the retrieved users in state',
      expected: put(setUsers(users)),
      actual: iterator.next(userDetails).value,
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
    assert({
      given: 'no arguments',
      should: 'set the loading state back to normal',
      expected: put(setLoading(false)),
      actual: iterator.next().value,
    });
  }
});
