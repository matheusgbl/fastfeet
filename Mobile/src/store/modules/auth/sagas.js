import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import api from '../../../services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `orders/${id}`);

    const order = response.data;

    if (!order) {
      Alert.alert('Error', 'Invalid ID.');
      yield put(signFailure());
      return;
    }
    order.createdAt = format(parseISO(order.createdAt), 'dd/MM/yyyy');
    yield put(signInSuccess(order));
  } catch (e) {
    Alert.alert('Falha na autenticação', 'Verifique os dados fornecidos.');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
