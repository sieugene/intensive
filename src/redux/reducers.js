import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import {moduleName as auth} from './../ducks/auth'
import authReducer from './../ducks/auth'
import history from "../history";


export default combineReducers({
  router: connectRouter(history),
  [auth]: authReducer
});
