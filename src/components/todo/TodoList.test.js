import React, { useState, useEffect } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

export default function User(props) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchUserData(id) {
    const response = await fetch("/" + id);
    setUser(await response.json());
    setLoading(true);
  }

  useEffect(() => {
    fetchUserData(props.id);
  }, [props.id]);

  if (!loading) {
    return "loading...";
  }

  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong> years old
      <br />
      lives in {user.address}
    </details>
  );
}

describe("User component", () => {
  let container = null;
  beforeEach(() => {
    // подготавливаем DOM-элемент, куда будем рендерить
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // подчищаем после завершения
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it("renders user data", async () => {
    const fakeUser = {
      name: "Joni Baez",
      age: "32",
      address: "123, Charming Avenue",
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeUser),
      })
    );

    // Используем act асинхронно, чтобы передать успешно завершённые промисы
    await act(async () => {
      render(<User id="123" />, container);
    });

    expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
    expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
    expect(container.textContent).toContain(fakeUser.address);

    // выключаем фиктивный fetch, чтобы убедиться, что тесты полностью изолированы
    global.fetch.mockRestore();
  });
});
