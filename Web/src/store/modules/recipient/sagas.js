import { all, call, put, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '../../../services/api';

import {
  createRecipientSuccess,
  createRecipientFailure,
  editRecipientSuccess,
  editRecipientFailure,
  updateRecipientSuccess,
  updateRecipientFailure,
} from './actions';

import history from '../../../services/history';

export function* createRecipient({ payload }) {
  const {
    id,
    name,
    street,
    number,
    complement,
    state,
    city,
    zipcode,
  } = payload.data;

  try {
    yield call(api.post, '/recipients', {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });

    yield put(createRecipientSuccess());

    toast.success('Recipient created!');

    history.push('/recipients');
  } catch ({ response }) {
    yield put(createRecipientFailure());
    console.tron.log(response.data.error);
    toast.error(response.data.error);
  }
}

export function* editRecipient({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `/recipients/${id}`);

    yield put(editRecipientSuccess(response.data));

    history.push('recipient_edit');
  } catch ({ response }) {
    yield put(editRecipientFailure());

    console.tron.log(response.data.error);
    toast.error(response.data.error);
  }
}

export function* updateRecipient({ payload }) {
  const {
    id,
    name,
    street,
    number,
    complement,
    city,
    state,
    zipcode,
  } = payload.data;

  try {
    yield call(api.put, `/recipients/${id}`, {
      name,
      street,
      number,
      complement,
      city,
      state,
      zipcode,
    });

    yield put(updateRecipientSuccess());

    toast.success('Recipient updated!');

    history.push('/recipients');
  } catch ({ response }) {
    yield put(updateRecipientFailure());
    console.tron.log(response.data.error);
  }
}

export default all([
  takeLatest('@recipient/CREATE_REQUEST', createRecipient),
  takeLatest('@recipient/EDIT_REQUEST', editRecipient),
  takeLatest('@recipient/UPDATE_REQUEST', updateRecipient),
]);
