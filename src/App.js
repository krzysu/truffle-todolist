import React from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default App;
