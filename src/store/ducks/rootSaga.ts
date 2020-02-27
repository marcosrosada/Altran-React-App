import { all, takeLatest } from 'redux-saga/effects';

import { SidebarTypes } from './sidebar/types';
import { loadMenu } from './sidebar/sagas';

export default function* rootSaga() {
  return yield all([takeLatest(SidebarTypes.LOAD_MENU_REQUEST, loadMenu)]);
}
