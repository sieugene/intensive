import { ADD_TODO_REQUEST, addTodoWorker } from "./todo";

describe("Todo Duck", () => {
  describe("Saga", () => {
    it("should add todo", () => {
      const todo = {
        title: "event title",
        url: "https://url.com",
      };
      const action = {
        type: ADD_TODO_REQUEST,
        todo: todo,
        id: "2",
      };
      const process = addTodoWorker(action);

      const step1 = process.next();
      expect(step1.done).toBe(false);
      expect(step1.value.payload.args[0]).toBe(todo);

      const step2 = process.next(42);
      expect(step2.done).toBe(false);
      expect(step2.value.id).toBe("2");

      const step3 = process.next();
      expect(step3.done).toBe(true);
    });
  });
});
