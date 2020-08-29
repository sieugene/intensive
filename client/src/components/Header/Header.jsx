import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useAuthorized, signOutRequest } from "../../ducks/auth";
import { useDispatch } from 'react-redux';

const Header = (props) => {
  const isAuth = useAuthorized();
  const dispatch = useDispatch()
  return (
    <div className="header">
      <ul>
        <li>
          <NavLink to="/">
            home
          </NavLink>
        </li>
        {isAuth && (
          <li>
            <NavLink to="/todo" activeStyle={{ color: "red" }}>
              todo
            </NavLink>
          </li>
        )}

        {!isAuth && (
          <li>
            {" "}
            <NavLink to="/auth" activeStyle={{ color: "red" }}>
              auth
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/admin" activeStyle={{ color: "red" }}>
            admin
          </NavLink>
        </li>
        {isAuth && (
          <li onClick={() => {dispatch(signOutRequest())}}>
            {" "}
           exit
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
