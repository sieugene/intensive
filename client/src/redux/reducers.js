import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { moduleName as auth } from "./../ducks/auth";
import { moduleName as todo } from "./../ducks/todo";
import authReducer from "./../ducks/auth";
import todoReducer from "./../ducks/todo";
import history from "../history";

export default combineReducers({
  router: connectRouter(history),
  [auth]: authReducer,
  [todo]: todoReducer,
});
