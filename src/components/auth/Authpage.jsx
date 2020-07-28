import React from "react";
import SignIn from "./SigIn";
import SignUp from "./SignUp";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { useAuthorized, userSelector } from "./../../ducks/auth";
import { useSelector } from "react-redux";

const Authpage = (props) => {
  const isAuth = useAuthorized();
  const user = useSelector(userSelector);
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
