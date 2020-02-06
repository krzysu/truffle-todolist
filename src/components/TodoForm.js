import React, {useState} from "react";
import {createTodo} from "../utils/contract";
import styles from "./TodoForm.module.css";

const DEFAULT_VALUE = 0.001;

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(DEFAULT_VALUE);

  const handleSubmit = async e => {
    e.preventDefault();
    await createTodo(title, value);
    setTitle("");
    setValue(DEFAULT_VALUE);
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
