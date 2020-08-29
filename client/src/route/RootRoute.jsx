import React from "react";
import App from "./../app";
import { Route } from "react-router-dom";
import Authpage from "./../components/auth/Authpage";
import TodosPage from "../components/todo/TodosPage";
import Header from "../components/Header/Header";

const RootRoute = () => {
  return (
    <>
      <App>
        <Header/>
        <Route path="/auth" component={Authpage} />
        <Route exact path="/todo" component={TodosPage} />
      </App>
    </>
  );
};

export default RootRoute;
