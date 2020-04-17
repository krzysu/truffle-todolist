import React, {useEffect} from "react";
import {connect} from "react-redux";
import {connectCachedWallet} from "./store/account";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";

import styles from "./App.module.css";

const App = ({connectCachedWallet}) => {
  useEffect(() => {
    connectCachedWallet();
  }, [connectCachedWallet]);

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

const mapDispatchToProps = {connectCachedWallet};

export default connect(null, mapDispatchToProps)(App);
