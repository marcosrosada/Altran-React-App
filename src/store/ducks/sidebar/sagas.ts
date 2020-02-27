import { call, put } from 'redux-saga/effects';
import api from '../../../services/api';

import { loadMenuSuccess } from './actions';

export function* loadMenu() {
  try {
    const response = yield call(api.get, 'menu');

    yield put(loadMenuSuccess(response.data));
  } catch (error) {}
}
