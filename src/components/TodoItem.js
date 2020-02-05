import React from "react";

const TodoItem = ({id, title, value, isDone, onClick}) => {
  return (
    <div>
      <input type="checkbox" disabled checked={isDone} value={id} />
      <h3>Task: {title}</h3>
      <div>Award: {value}</div>
      <button onClick={onClick}>Mark as done</button>
    </div>
  );
};

export default TodoItem;
