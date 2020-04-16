import React from "react";
import {formatBalance} from "../utils/utils";

import styles from "./TodoItem.module.css";

const TodoItem = ({title, deposit, isDone, onClick}) => {
  return (
    <div className={styles.item}>
      <div>
        <label>Task</label>
        <div className={styles.value}>{title}</div>
      </div>
      <div>
        <label>{!isDone ? "Deposit" : "Claimed"}</label>
        <div className={styles.value}>{formatBalance(deposit)}</div>
      </div>
      {!isDone && (
        <button onClick={onClick} className={styles.button}>
          Mark as done
        </button>
      )}
    </div>
  );
};

export default TodoItem;
