import React from "react";
import { NavLink, Route } from "react-router-dom";
import Authpage from './../auth/Authpage';

function AuthPage() {
  return (
    <div>
      <h1>Auth Page</h1>
      <div>
        <NavLink to="/auth">Авторизация</NavLink>
      </div>
      <Route path="/auth" component={Authpage} />
    </div>
  );
}

export default AuthPage;
