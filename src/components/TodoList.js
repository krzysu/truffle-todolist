import React from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const items = [
    {
      id: "1",
      title: "First todo is a very long item that can stretch to a few lines",
      value: "1.5000 ETH",
      isDone: false
    },
    {
      id: "2",
      title: "Second todo",
      value: "0.0001 ETH",
      isDone: true
    }
  ];

  const handleClick = id => () => {
    console.log("mark as done", id);
  };

  return (
    <div>
      {items.length > 0 ? (
        items.map(item => (
          <TodoItem key={item.id} onClick={handleClick(item.id)} {...item} />
        ))
      ) : (
        <div>No tasks created from your address yet.</div>
      )}
    </div>
  );
};

export default TodoList;
