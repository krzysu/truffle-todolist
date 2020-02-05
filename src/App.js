import React from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <Header />
        <TodoForm />
        <TodoList />
      </div>
      <Footer />
    </div>
  );
};

export default App;
