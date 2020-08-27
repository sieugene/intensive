import React from "react";
import SignIn from "./SigIn";
import SignUp from "./SignUp";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Route } from "react-router-dom";
import { useAuthorized, userSelector } from "./../../ducks/auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import history from "../../history";

const Authpage = (props) => {
  const isAuth = useAuthorized();
  const user = useSelector(userSelector);
  const route = useRouteMatch()
  useEffect(() => {
    if(isAuth && history && history.location.pathname === '/auth/sigin' || history.location.pathname === '/auth/signup'){
      return history.push('/auth');
    }
  }, [user])
  return (
    <div>
      {user && user.email}
      {!isAuth && (
        <>
          <NavLink to={"/auth/sigin"}>Войти</NavLink>
          <br />
          <NavLink to={"/auth/signup"}>Зарегистрироваться</NavLink>
        </>
      )}
      <Route exact path="/auth/sigin" component={SignIn} />
      <Route exact path="/auth/signup" component={SignUp} />
    </div>
  );
};
export default Authpage;
