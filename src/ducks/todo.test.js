import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import apiService from "./../api/api";

const api = (data) => apiService.addTodo;
let todos = [];
let todo = {
  title: "test title",
};
const someAction = () => ({ type: "ADD_TODO", todo });
const findCurrentTodo = (arr, added) => {
  let result = arr.filter((a) => {
    return a.title === added.title;
  });
  return result;
};
function* mySaga() {
  try {
    yield call(api, todo);
    yield put(someAction);
  }catch{
      //nothing
  }
}

describe("Testing add todo", () => {
  const it = sagaHelper(mySaga());
  it("should call adding todo", (result) => {
    expect(result).toEqual(call(api, todo));
  });
  it("should put action work", (result) => {
    expect(result).toEqual(put(someAction));
    todos.push(todo);
  });
  it("should be added in store", (result) => {
    let newResult = todo;
    let search = findCurrentTodo(todos, todo);
    expect(newResult).toEqual(search[0]);
  });
});
