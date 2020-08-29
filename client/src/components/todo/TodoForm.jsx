import React from 'react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addTodoRequest } from './../../ducks/todo';

const TodoForm = (props) => {
  const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
          title: '',
        },
        onSubmit: values => {
          let todo = {
            title: values.title
          }
          dispatch(addTodoRequest(todo))
        },
      });
      return (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <button type="submit">Add</button>
        </form>
      )
}

export default TodoForm