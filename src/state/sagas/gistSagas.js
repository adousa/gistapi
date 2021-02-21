import { debounce, takeEvery, call, put } from "redux-saga/effects";

import { getPublicGists, getGistForUser } from "../../services/gistService";

import {
  GET_GIST_PUBLIC_DATA_FAILED,
  GET_GIST_PUBLIC_DATA_COMPLETED,
  SEARCH_GIST_BY_USERNAME_COMPLETED,
  SEARCH_GIST_BY_USERNAME_FAILED,
  SEARCH_GIST_BY_USERNAME_STARTED,
  GET_GIST_PUBLIC_DATA_STARTED,
} from "../actions/gistAction";

/**
 * helper function to destruct parameters
 * @param query
 * @returns {Promise<RestEndpointMethodTypes["gists"]["listForUser"]["response"]>}
 */
const searchByUserName = ({ query }) => {
  return getGistForUser(query);
};

/**
 * get all gist public data
 * @returns {Generator<<"CALL", CallEffectDescriptor>|<"PUT", PutEffectDescriptor<{payload: *, type: string}>>|<"PUT", PutEffectDescriptor<{data: *, type: string}>>, void, []>}
 */
export function* getDataGenerator() {
  let response = [];
  try {
    response = yield call(getPublicGists);
  } catch (errors) {
    yield put({
      type: GET_GIST_PUBLIC_DATA_FAILED,
      payload: errors,
    });
    return;
  }
  yield put({
    type: GET_GIST_PUBLIC_DATA_COMPLETED,
    data: (response || []).data,
  });
}

/**
 * search by username generator function
 * @param query
 * @returns {Generator<<"CALL", CallEffectDescriptor>|<"PUT", PutEffectDescriptor<{payload: *, type: string}>>|<"PUT", PutEffectDescriptor<{data: *, type: string}>>, void, []>}
 */
export function* searchByUserNameGenerator({ query }) {
  let response = [];
  try {
    response = yield call(searchByUserName, { query });
  } catch (errors) {
    yield put({
      type: SEARCH_GIST_BY_USERNAME_FAILED,
      payload: errors,
    });
    return;
  }
  yield put({
    type: SEARCH_GIST_BY_USERNAME_COMPLETED,
    data: (response || []).data,
  });
}

export default function* rootSaga() {
  yield takeEvery(GET_GIST_PUBLIC_DATA_STARTED, getDataGenerator);
  yield debounce(
    1000,
    SEARCH_GIST_BY_USERNAME_STARTED,
    searchByUserNameGenerator
  );
}
