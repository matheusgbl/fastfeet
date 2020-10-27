import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { signInSuccess, signFailure } from './actions';

import api from '../../../services/api';

export function* signIn({ payload }) {
  try {
    const { email } = payload;

    const response = yield call(api.post, 'sessiondeliveryman', { email });

    console.tron.log(response.data);

    const { token, deliveryman, avatar } = response.data;

    if (deliveryman.provider === 'false') {
      Alert.alert('Login error!', 'User need to be a registered deliveryman!');
      return;
    }

    yield put(signInSuccess(token, deliveryman, avatar));
  } catch (err) {
    Alert.alert('Autehntication failed!', 'Verify your email and try again.');

    yield put(signFailure());
  }
}

export function signOut() {}

export function setToken({ payload }) {
  if (payload) {
    const { token } = payload.auth;

    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
