import React, {useState} from "react";
import {connect} from "react-redux";
import {selectIsConnected} from "../store/account/selectors";
import {addTodo} from "../store/todos/actions";

import styles from "./TodoForm.module.css";

const DEFAULT_DEPOSIT = 0.001;

const TodoForm = ({isConnected, addTodo}) => {
  const [title, setTitle] = useState("");
  const [deposit, setDeposit] = useState(DEFAULT_DEPOSIT);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addTodo(title, deposit);
      setTitle("");
      setDeposit(DEFAULT_DEPOSIT);
    } catch (e) {}
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleDepositChange = e => {
    setDeposit(e.target.value);
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
        <label>Deposit ETH</label>
        <div>
          <input
            type="number"
            step={DEFAULT_DEPOSIT}
            min="0"
            value={deposit}
            onChange={handleDepositChange}
            required
          />
        </div>
      </div>
      <button type="submit" disabled={!isConnected} className={styles.button}>
        Add
      </button>
    </form>
  );
};

const mapStateToProps = state => ({
  isConnected: selectIsConnected(state)
});

const mapDispatchToProps = {addTodo};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
