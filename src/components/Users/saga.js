import { Octokit } from '@octokit/rest';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  createUser,
  createRepo,
  setUsers,
  setTotalCount,
  setPages,
  setLoading,
} from './reducer';
import parse from 'parse-link-header';

let octokit;

export const initOctokit = (token = '') => {
  octokit = new Octokit({ auth: token });
};

export const getUsers_sagaAction = ({
  q = '',
  page = 1,
  per_page = 7,
  sort = 'followers',
} = {}) => ({
  type: getUsers_sagaAction.type,
  payload: {
    q,
    page,
    per_page,
    sort,
  },
});
getUsers_sagaAction.type = 'searchUsers/sagaAction/getUsers';

const getReposInfoForEachUser = (users) => {
  let usersReposMeta;
  try {
    usersReposMeta = all(
      users.map((user) =>
        call(octokit.repos.listForUser, {
          username: user.login,
          sort: 'updated',
        })
      )
    );
  } catch (e) {
    if (process.env.NODE_ENV === 'development') console.log(e);
  }
  return usersReposMeta;
};

/*
 * Update the list of users without repos info
 *
 * We use createRepo() so that if the github repo object ever changes
 * we don't need to change our object throughout our code, we can simply update
 * the createRepo() function
 */
const updateUsersRepos = (users, usersReposMeta) =>
  users.map((user) => {
    let userReposMeta = usersReposMeta.find((reposMeta) =>
      reposMeta.data[0] ? user.id === reposMeta.data[0].owner.id : false
    );
    const repos = userReposMeta
      ? userReposMeta.data.map((repo) => createRepo(repo))
      : [];
    user.repos = repos;
    return user;
  });

const getUsersMeta = (res = {}) => {
  let users = res.data.items;
  let usersMeta;

  try {
    usersMeta = all(
      users.map((user) =>
        call(octokit.users.getByUsername, { username: user.login })
      )
    );
  } catch (e) {
    if (process.env.NODE_ENV === 'development') console.log(e);
  }

  return usersMeta;
};
const getTotalCountFromResponse = (res) => res.data.total_count;

const getLinksFromResponse = (res) =>
  res.headers.link ? parse(res.headers.link) : {};

export function* getUsers_saga(action) {
  let users = [];
  try {
    /*
     * Let's put our application in a loading state. We might not want to display partial
     * results that are later updated.
     */
    yield put(setLoading(true));

    /*
     * Get users metadata from github
     */
    const res = yield call(octokit.search.users, action.payload);

    const total_count = getTotalCountFromResponse(res);
    yield put(setTotalCount(total_count));

    const pages = getLinksFromResponse(res);

    /*
     * Save current page
     */
    pages.current = { page: action.payload.page.toString() };
    yield put(setPages(pages));

    /*
     * Get the list of users without metadata
     *
     * We use createUser() so that if the github user object ever changes
     * we don't need to change our object throughout our code, we can simply update
     * the createUser() function
     */
    const usersMeta = yield getUsersMeta(res);
    users = usersMeta.map((meta) => createUser(meta.data));

    /*
     * Update users in the state
     */
    yield put(setUsers(users));

    /*
     * Get repos metadata from github
     */
    const usersReposMeta = yield getReposInfoForEachUser(users);

    /*
     * Update repos for each user with useful info (repos names, stars etc)
     */
    users = updateUsersRepos(users, usersReposMeta);

    /*
     * Update users in the state
     * and set the loading state back to false
     */
    yield put(setUsers(users));
    yield put(setLoading(false));
  } catch (e) {
    if (process.env.NODE_ENV === 'development') console.log(e);
    yield put(setLoading(false));
  }
}

export function* watchGetUsers() {
  yield takeEvery(getUsers_sagaAction.type, getUsers_saga);
}
