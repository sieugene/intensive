import { Record, OrderedMap } from "immutable";
import { appName } from "../config";
import { takeEvery, take } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import apiService from "./../api/api";
import { put } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

/**
 * Constants
 * */
export const moduleName = "todo";
const prefix = `${appName}/${moduleName}`;

export const GET_TODOS = `${prefix}/GET_TODOS`;
export const SUCCESS_TODOS = `${prefix}/SUCCESS_TODOS`;
export const FAIL_TODOS = `${prefix}/FAIL_TODOS`;
export const TOGGLE_LOADING = `${prefix}/TOGGLE_LOADING`;
export const ADD_TODO = `${prefix}/ADD_TODO`;
export const ADD_TODO_REQUEST = `${prefix}/ADD_TODO_REQUEST`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  todos: [],
  error: null,
  loading: false,
});

const TodoRecord = Record({
  id: null,
  title: "",
  url: "",
  where: "",
  when: "",
  month: "",
  submissionDeadline: "",
});

const arrToMap = (arr) => {
  const map = arr.reduce((acc, el) => {
    acc[el.id] = new TodoRecord(el);
    return acc;
  }, {});
  return new OrderedMap(map);
};

export default function reducer(state = new ReducerRecord(), action) {
  switch (action.type) {
    case ADD_TODO:
      return state.setIn(["todos", action.id], new TodoRecord(action.todo));
    case SUCCESS_TODOS:
      return state.set("todos", arrToMap(action.todos));
    case TOGGLE_LOADING:
      return state.set("loading", action.loading);
    case FAIL_TODOS:
      return state.set("error", action.error);
    default:
      return state;
  }
}
/**
 * Selectros
 */
export const todosSelector = (state) => {
  return (
    state[moduleName].todos.size >= 1 &&
    state[moduleName].todos
      .valueSeq()
      .toArray()
      .sort((a, b) => (a.title < b.title ? -1 : 1))
  );
};
export const loadingTodoSelector = (state) => state[moduleName].loading;
/**
 * Custom Hooks
 */
/**
 * Action Creators
 * */
export const getTodos = () => ({
  type: GET_TODOS,
});
export const successTodos = (todos) => ({
  type: SUCCESS_TODOS,
  todos,
});
export const failTodos = (error) => ({
  type: FAIL_TODOS,
  error,
});
export const toggleLoading = (loading) => ({
  type: TOGGLE_LOADING,
  loading,
});
export const addTodo = (id, todo) => ({
  type: ADD_TODO,
  id,
  todo,
});
export const addTodoRequest = (todo) => ({
  type: ADD_TODO_REQUEST,
  todo,
});

/**
 * Sagas
 */

export function* fetchTodosWorker() {
  yield call(syncTodosWorker);
}

export const createTodosChannel = () => {
  return eventChannel((emit) => apiService.onTodosChange((data) => emit({ data })));
};

export const syncTodosWorker = function* () {
  const chanel = yield call(createTodosChannel);
  while (true) {
    const { data } = yield take(chanel);
    if (data) {
      yield put(successTodos(data));
    } else {
    
    }
  }
};

export function* addTodoWorker({ todo,id }) {
  try {
    yield call(apiService.addTodo, todo);
    //don't put this only for test file
    yield addTodo(id,todo)
  } catch (error) {
    yield put(failTodos(error));
  }
}

export function* todoSagaWatcher() {
  yield takeEvery(GET_TODOS, fetchTodosWorker);
  yield takeEvery(ADD_TODO_REQUEST, addTodoWorker);
}
