import { describe } from 'riteway';
import usersReducer, {
  initialState,
  createUser,
  setUsers,
  getUsers,
  setPages,
  getPages,
  setTotalCount,
  getTotalCount,
  setLoading,
  getLoading,
} from './reducer';

const createPages = ({
  next = {},
  last = {},
  prev = {},
  first = {},
  current = { page: '1' },
} = {}) => ({
  next,
  last,
  prev,
  first,
  current,
});

const createState = ({
  users = [],
  total_count = 0,
  pages = createPages(),
  loading = false,
} = {}) => ({
  users,
  total_count,
  pages,
  loading,
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
    const state = usersReducer(usersReducer(), setUsers(users));
    assert({
      given: 'a list of users',
      should: 'set those users as state',
      expected: createState({ users }),
      actual: state,
    });
    assert({
      given: 'a state',
      should: 'get the users from the state',
      expected: users,
      actual: getUsers(state),
    });
  }
  {
    const pages = createPages();
    const state = usersReducer(usersReducer(), setPages(pages));
    assert({
      given: 'a set of pages',
      should: 'set the pages in the state',
      expected: createState({ pages }),
      actual: state,
    });
    assert({
      given: 'a state',
      should: 'set the pages from the state',
      expected: pages,
      actual: getPages(state),
    });
  }
  {
    const total_count = 75;
    const state = usersReducer(usersReducer(), setTotalCount(total_count));
    assert({
      given: 'a total count',
      should: 'set the total count in the state',
      expected: createState({ total_count }),
      actual: state,
    });
    assert({
      given: 'a state',
      should: 'get the total count from the state',
      expected: total_count,
      actual: getTotalCount(state),
    });
  }
  {
    const loading = true;
    const state = usersReducer(usersReducer(), setLoading(loading));
    assert({
      given: 'a loading state',
      should: 'set the loading',
      expected: loading,
      actual: getLoading(state),
    });
  }
});
