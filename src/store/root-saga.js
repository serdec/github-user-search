// eslint-disable-next-line
import { all } from 'redux-saga/effects';
import { watchGetUsers } from '../components/Users/saga';

export default function* rootSaga() {
  yield all([watchGetUsers()]);
}
