import { Record } from "immutable";
import { call, put, takeEvery } from "redux-saga/effects";
import { appName } from "./../config";
/**
 * Constants
 * */
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGNUP_START = `${prefix}/SIGNUP_START`;
export const SIGNUP_ERROR = `${prefix}/SIGNUP_ERROR`;
export const SIGNUP_SUCCESS = `${prefix}/SIGNUP_SUCCESS`;
export const SIGNUP_END = `${prefix}/SIGNUP_END`;

/**
 * Reducer
 *
 * */

export const ReducerRecord = Record({
  user: null,
  loading: false,
  error: null,
});

export default function reducer(state = new ReducerRecord(), action) {
  switch (action.type) {
    case SIGNUP_START:
      return state.set("loading", true);
    case SIGNUP_SUCCESS:
      return state.set("loading", false).set("user", action.user);
    case SIGNUP_ERROR:
      return state.set("error", action.error);
    default:
      return state;
    case SIGNUP_END:
      return state.set("loading", false);
  }
}

/**
 * Selectros
 *
 */
export const userSelector = (state) => state[moduleName].user;

/**
 * Custom Hooks
 *
 */

/**
 * Action Creators
 *
 * */

export const signUpRequest = (values) => ({
  type: SIGN_UP_REQUEST,
  values,
});

export const signUpStart = () => ({
  type: SIGNUP_START,
});

export const signUpSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  user,
});

export const signUpEnd = () => ({
  type: SIGNUP_END,
});

export const setSignUpError = (error) => ({
  type: SIGNUP_ERROR,
  error,
});

/**
 * Sagas
 *
 */

export function* signUpSagaWorker({ values }) {
  return ''
  // `LOGIC LOGIN`;
}

export function* signUpSagaWatcher() {
  yield takeEvery(SIGN_UP_REQUEST, signUpSagaWorker);
}
