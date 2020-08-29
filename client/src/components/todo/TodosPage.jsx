import React from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { connect } from "react-redux";
import withAuth from "../HOCS/IsAuth";



const TodosPage = () => {
  return (
    <div>
      Todos Page
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default connect(null, null)(withAuth(TodosPage))
