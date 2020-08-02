import React from "react";
import { useSelector } from "react-redux";
import { todosSelector } from "../../ducks/todo";
import { loadingTodoSelector, getTodos } from "./../../ducks/todo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useCallback } from "react";

const TodoList = (props) => {
  const todos = useSelector(todosSelector);
  const loading = useSelector(loadingTodoSelector);
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, [])
  useEffect(() => {
    stableDispatch(getTodos());
  }, [stableDispatch]);

  if (loading) {
    return "loading";
  }
  return (
    <div>
      {todos.length >= 1 &&
        todos.map((t) => {
          return (
            <ul key={t.id}>
              <li>Title:{t.title}</li>
              <li>Date:{t.when}</li>
            </ul>
          );
        })}
    </div>
  );
};

export default TodoList;
