import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthorized } from "./ducks/auth";

function App() {
  const isAuth = useAuthorized();
  return (
    <div>
      <nav>
        <ul>
          {isAuth && (
            <li>
              <NavLink to="/todo" activeStyle={{ color: "red" }}>
                todo
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/auth" activeStyle={{ color: "red" }}>
              auth
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" activeStyle={{ color: "red" }}>
              admin
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
