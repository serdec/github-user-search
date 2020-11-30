import { Octokit } from '@octokit/rest';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { createUser, createRepo, setUsers } from './reducer';

export const getUsers_sagaAction = ({ q = '', page = 1 } = {}) => ({
  type: getUsers_sagaAction.type,
  payload: {
    q,
    page,
  },
});
getUsers_sagaAction.type = 'searchUsers/sagaAction/getUsers';

const octokit = new Octokit();

const getReposInfoForEachUser = (users) => {
  let usersReposMeta = [];
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
 * update the list of users without repos info
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

export function* getUsers_saga(action) {
  let users = [];
  try {
    /* get users metadata from github */
    const res = yield call(octokit.search.users, action.payload);

    /*
     * get the list of users without metadata
     *
     * We use createUser() so that if the github user object ever changes
     * we don't need to change our object throughout our code, we can simply update
     * the createUser() function
     */
    users = res.data.items.map((item) => createUser(item));

    /* update users in the state */
    yield put(setUsers(users));

    /* get repos metadata from github */
    const usersReposMeta = yield getReposInfoForEachUser(users);

    /* update repos for each user with useful info (repos names, stars etc) */
    users = updateUsersRepos(users, usersReposMeta);

    /* update users in the state */
    yield put(setUsers(users));
  } catch (e) {
    if (process.env.NODE_ENV === 'development') console.log(e);
  }
}

export function* watchGetUsers() {
  yield takeEvery(getUsers_sagaAction.type, getUsers_saga);
}
