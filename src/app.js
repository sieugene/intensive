import React from "react";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <ul>
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
