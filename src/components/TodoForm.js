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
      <div className={styles.task}>
        <label>Task</label>
        <input
          type="text"
          placeholder="Write your task here"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className={styles.value}>
        <label>Value ETH</label>
        <input
          type="number"
          step="0.001"
          value={value}
          onChange={handleValueChange}
          required
        />
      </div>
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;
