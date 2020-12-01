export const createUser = ({
  login = '',
  id = -1,
  avatar_url = '',
  url = '',
  html_url = '',
  followers_url = '',
  following_url = '',
  repos_url = '',
  repos = [],
  type = 'User',
  name = '',
  company = '',
  public_repos = 0,
  followers = 0,
  following = 0,
  bio = '',
} = {}) => ({
  login,
  id,
  avatar_url,
  url,
  html_url,
  followers_url,
  following_url,
  repos_url,
  repos,
  type,
  name,
  company,
  public_repos,
  followers,
  following,
  bio,
});

export const createRepo = ({
  id = -1,
  name = '',
  stargazers_count = 0,
  html_url = '',
} = {}) => ({
  id,
  name,
  stargazers_count,
  html_url,
});

export const getUsers = (state) => state.users;
export const setUsers = (users = []) => ({
  type: setUsers.type,
  payload: users,
});
setUsers.type = 'userSearch/setUsers';

export const createPages = (
  next = {},
  prev = {},
  last = {},
  first = {},
  current = { page: '1' }
) => ({
  next,
  prev,
  last,
  first,
  current,
});
export const getPages = (state) => state.pages;
export const setPages = ({
  next = {},
  prev = {},
  last = {},
  first = {},
  current = { page: '1' },
} = {}) => ({
  type: setPages.type,
  payload: { next, prev, last, first, current },
});
setPages.type = 'userSearch/setPages';

export const getTotalCount = (state) => state.total_count;
export const setTotalCount = (total_count = 0) => ({
  type: setTotalCount.type,
  payload: total_count,
});
setTotalCount.type = 'userSearch/setTotalCount';

export const getLoading = (state) => state.loading;
export const setLoading = (loading = false) => ({
  type: setLoading.type,
  payload: loading,
});
setLoading.type = 'userSearch/setLoading';

export const initialState = ({
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

const usersReducer = (
  state = initialState(),
  { type = '', payload = {} } = {}
) => {
  switch (type) {
    case setUsers.type:
      return {
        ...state,
        users: payload,
      };
    case setPages.type:
      return {
        ...state,
        pages: payload,
      };
    case setTotalCount.type:
      return {
        ...state,
        total_count: payload,
      };
    case setLoading.type:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
