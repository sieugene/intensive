import { all, call } from "redux-saga/effects";
import { signUpSagaWatcher } from "./../ducks/auth";
import { todoSagaWatcher } from "../ducks/todo";

export default function* () {
  yield all([call(signUpSagaWatcher), call(todoSagaWatcher)]);
}
