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
  name = null,
  company = null,
  public_repos = 0,
  followers = 0,
  following = 0,
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
});

export const createRepo = ({
  id = -1,
  name = '',
  stargazers_count = 0,
} = {}) => ({
  id,
  name,
  stargazers_count,
});

export const initialState = () => ({
  users: [],
});

export const getUsers = (state) => state.users;

export const setUsers = (users = []) => ({
  type: setUsers.type,
  payload: users,
});
setUsers.type = 'userSearch/setUsers';

const usersReducer = (
  state = initialState(),
  { type = '', payload = {} } = {}
) => {
  switch (type) {
    case setUsers.type:
      return {
        users: payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
