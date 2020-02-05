import React, {useState} from "react";
import styles from "./TodoForm.module.css";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0.001);

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
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <div>
        <label>Task</label>
        <div>
          <input
            type="text"
            placeholder="Write your task here"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
      </div>
      <div>
        <label>Value ETH</label>
        <div>
          <input
            type="number"
            step="0.001"
            value={value}
            onChange={handleValueChange}
            required
          />
        </div>
      </div>
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;
