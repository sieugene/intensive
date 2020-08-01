import React, { useEffect } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { connect } from "react-redux";
import { withAuth } from './../HOCS/IsAuth';
import apiService from './../../api/api'


const TodosPage = () => {
    const getCollection = () => {
        apiService.getTodosCollection().then((resp) => {
        })
    }
    useEffect(() => {
        getCollection()
    }, [])
  return (
    <div>
      Todos Page
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default connect(null, null)(withAuth(TodosPage))
