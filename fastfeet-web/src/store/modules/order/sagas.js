import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  editOrderSuccess,
  editOrderFailure,
  updateOrderSuccess,
  updateOrderFailure,
} from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* editOrder({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `order/${id}`);
    console.tron.log(response.data);

    yield put(editOrderSuccess(response.data));

    history.push('/orders_edit');
  } catch ({ response }) {
    yield put(editOrderFailure());
    console.tron.log(response.data.error);
  }
}

export function* updateOrder({ payload }) {
  const { id, data } = payload;
  console.tron.log(id, data);

  try {
    yield call(api.put, `/orders/${id}`, data);

    yield put(updateOrderSuccess());

    history.push('/orders');

    toast.success('Order updated!');
  } catch ({ response }) {
    yield put(updateOrderFailure());
    console.tron.log(response.data.error);
  }
}

export default all([
  takeLatest('@order/EDIT_REQUEST', editOrder),
  takeLatest('@order/UPDATE_REQUEST', updateOrder),
]);
