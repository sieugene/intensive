import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import history from "../history";
import rootSaga from './sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware, routerMiddleware(history), logger]
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(...middleWares)
  )
);
sagaMiddleware.run(rootSaga);

export default store;
