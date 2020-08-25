import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider, useSelector } from "react-redux";
import TodoList from "./TodoList";
import { successTodos } from "../../ducks/todo";
import store from "../../redux/root";

const renderTestedComponent = () => {
  return render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("test TestedComponent components", () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => {
      return callback(store.getState());
    });
  });
  it("should be show one todo", () => {
    store.dispatch(successTodos([{ id: 1, title: "text" }]));
    const { container } = renderTestedComponent();
    const ul = container.querySelectorAll("ul").length;
    expect(ul).toBe(1);
  });
  it("should be render", () => {
    const { container } = renderTestedComponent();
    expect(container).toBeInTheDocument();
  });
});
