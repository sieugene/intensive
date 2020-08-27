import React from "react";

function App(props) {
  return (
    <div>
      <nav>{props.children}</nav>
    </div>
  );
}

export default App;
