import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import  store  from "./redux/root";
import history from "./history";
import RootRoute from './route/RootRoute';


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootRoute/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
