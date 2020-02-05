import React, {useState} from "react";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("submit with", title, value);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleValueChange = e => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Task</label>
        <input
          type="text"
          placeholder="Write your task here"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label>Value in ETH</label>
        <input type="number" onChange={handleValueChange} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
