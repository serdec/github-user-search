import { describe } from 'riteway';
import usersReducer, { initialState, setUsers, createUser } from './reducer';

const createState = (users) => ({
  users,
});

describe('users reducer', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return the valid initial state',
    expected: initialState(),
    actual: usersReducer(),
  });
  {
    const users = [createUser(), createUser()];
    assert({
      given: 'a list of users',
      should: 'set those users as state',
      expected: createState(users),
      actual: usersReducer(usersReducer(), setUsers(users)),
    });
  }
});
