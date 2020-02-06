import React, {useState} from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import styles from "./App.module.css";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div>
        <Header
          onConnect={() => setIsConnected(true)}
          onDisconnect={() => setIsConnected(false)}
          isConnected={isConnected}
        />
        <TodoForm isConnected={isConnected} />
        <TodoList isConnected={isConnected} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
