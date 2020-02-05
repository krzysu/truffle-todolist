import React from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const items = [
    {
      id: "1",
      title: "First todo",
      value: "10000",
      isDone: false
    },
    {
      id: "2",
      title: "Second todo",
      value: "10000",
      isDone: true
    }
  ];

  const handleClick = id => () => {
    console.log("mark as done", id);
  };

  return (
    <div>
      {items.map(item => (
        <TodoItem key={item.id} onClick={handleClick(item.id)} {...item} />
      ))}
    </div>
  );
};

export default TodoList;
