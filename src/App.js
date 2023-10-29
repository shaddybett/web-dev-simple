import React, { useEffect, useState } from "react";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  });


   useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))},[todos])
  function handleSubmit(e) {
    e.preventDefault();
    setTodos((currentTodos) => [
      ...currentTodos,
      { title: newItem, complete: false },
    ]);
    setNewItem("");
  }

  function handleCheckboxChange(index) {
    const updatedTodos = [...todos];
    updatedTodos[index].complete = !updatedTodos[index].complete;
    setTodos(updatedTodos);
  }

  function handleDelete(index) {
    const updatedTodos = [...todos];
    updatedTodos.splice(index,1);
    setTodos(updatedTodos);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="item"></label>
          <h2>Todo list</h2>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btnA">Add</button>
      </form>
      <div className="partB">
      <h3>my list</h3>
      <ul>
        {todos.length === 0 && 'No todos'}
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleCheckboxChange(index)}
            />
            {todo.title}
            <label>item 1</label>
            <button
              className="btn btn-delete"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}

