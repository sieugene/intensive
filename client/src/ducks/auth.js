import { Record } from "immutable";
import { call, put, takeEvery, all, take } from "redux-saga/effects";
import { appName } from "./../config";
import apiService from "./../api/api";
import { eventChannel } from "redux-saga";
import { useSelector } from "react-redux";
/**
 * Constants
 * */
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
export const SIGNUP_START = `${prefix}/SIGNUP_START`;
export const SIGNUP_ERROR = `${prefix}/SIGNUP_ERROR`;
export const SIGNUP_SUCCESS = `${prefix}/SIGNUP_SUCCESS`;
export const SIGNUP_END = `${prefix}/SIGNUP_END`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const TOGGLE_INIT = `${prefix}/TOGGLE_INIT`;
export const SIGN_OUT = `${prefix}/SIGN_OUT`;
export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`;

/**
 * Reducer
 *
 * */

export const ReducerRecord = Record({
  user: null,
  loading: false,
  error: null,
  init: false,
});

export default function reducer(state = new ReducerRecord(), action) {
  switch (action.type) {
    case SIGNUP_START:
      return state.set("loading", true);
    case SIGNUP_SUCCESS:
      return state.set("loading", false).set("user", action.user);
    case SIGNUP_ERROR:
      return state.set("error", action.error);
    case TOGGLE_INIT:
      return state.set("init", true);
    case SIGNUP_END:
      return state.set("loading", false);
    case SIGN_OUT:
      return state.set("user", null).set("init", false);
    default:
      return state;
  }
}

/**
 * Selectros
 *
 */
export const userSelector = (state) => state[moduleName].user;

export const initSelector = (state) => state[moduleName].init;

/**
 * Custom Hooks
 *
 */

export const useAuthorized = () => {
  const user = useSelector(userSelector);
  return !!user;
};

/**
 * Action Creators
 *
 * */

export const signUpRequest = (values) => ({
  type: SIGN_UP_REQUEST,
  values,
});

export const signInRequest = (values) => ({
  type: SIGN_IN_REQUEST,
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

export const toggleInit = () => ({
  type: TOGGLE_INIT,
});

export const signOutAC = () => ({
  type: SIGN_OUT,
});

export const signOutRequest = () => ({
  type: SIGN_OUT_REQUEST,
});

// export const signInSuccess = () => ({
//   type: SIGN_IN_SUCCESS
// })

/**
 * Sagas
 *
 */

export const createAuthChanel = () => {
  return eventChannel((emit) =>
    apiService.onAuthChange((user) => emit({ user }))
  );
};

export const syncAuthState = function* () {
  const chanel = yield call(createAuthChanel);
  while (true) {
    const { user } = yield take(chanel);
    if (user) {
      yield put({
        type: SIGNUP_SUCCESS,
        user,
      });
      yield put(toggleInit());
    } else {
      yield put(toggleInit());
      // yield put({
      //   type: SIGN_OUT_SUCCESS,
      // });
    }
  }
};

export function* signUpSagaWorker({ values }) {
  try {
    yield put(signUpStart());
    const data = yield call(apiService.signUp, values.email, values.password);
    yield put(signUpSuccess(data.user));
    yield put(signUpEnd());
  } catch (error) {
    yield put(signUpEnd());
    yield put(setSignUpError(error));
  }
  return "";
  // `LOGIC LOGIN`;
}

export function* signInSagaWorker({ values }) {
  try {
    yield put(signUpStart());
    const data = yield call(apiService.signIn, values.email, values.password);
    yield put(signUpSuccess(data.user));
    yield put(signUpEnd());
  } catch (error) {
    yield put(signUpEnd());
    yield put(setSignUpError(error));
  }
  return "";
  // `LOGIC LOGIN`;
}

export function* signOutWorker() {
  try {
    yield call(apiService.signOut);
    yield put(signOutAC());
  } catch (error) {}
}

export function* signUpSagaWatcher() {
  yield all([
    call(syncAuthState),
    takeEvery(SIGN_UP_REQUEST, signUpSagaWorker),
    takeEvery(SIGN_IN_REQUEST, signInSagaWorker),
    takeEvery(SIGN_OUT_REQUEST, signOutWorker),
  ]);
}

/*test2*/
