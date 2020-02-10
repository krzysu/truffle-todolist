import React, {useEffect, useState} from "react";
import {
  getTodos,
  markTodoAsDone,
  subscribeToNewTodos,
  subscribeToMarkAsDone
} from "../utils/contract";
import TodoItem from "./TodoItem";

const TodoList = ({isConnected}) => {
  // const tempItems = [
  //   {
  //     id: "1",
  //     title: "First todo is a very long item that can stretch to a few lines",
  //     deposit: "1000000000000000",
  //     isDone: false
  //   },
  //   {
  //     id: "2",
  //     title: "Second todo",
  //     deposit: "3000000000000000",
  //     isDone: true
  //   }
  // ];
  const [items, setItems] = useState([]);
  const [isContractReady, setIsContractReady] = useState(false);

  useEffect(() => {
    const run = async () => {
      const items = await getTodos();
      setItems(items);
      setIsContractReady(true);
    };

    if (isConnected) {
      run();
    }
  }, [isConnected]);

  useEffect(() => {
    if (!isContractReady) {
      return;
    }
    const newToDoSubscription = subscribeToNewTodos((error, data) => {
      if (error) {
        console.error(error);
      }
      console.log("New item created", data);
    });

    const markAsDoneSubscription = subscribeToMarkAsDone((error, data) => {
      if (error) {
        console.error(error);
      }
      console.log("Item marked as done", data);
    });

    return () => {
      newToDoSubscription.unsubscribe();
      markAsDoneSubscription.unsubscribe();
    };
  }, [isContractReady]);

  const handleClick = id => () => {
    markTodoAsDone(id);
  };

  if (!isConnected) {
    return <div>Connect your wallet to see your tasks.</div>;
  }

  return (
    <div>
      {items.length > 0 ? (
        items.map(item => (
          <TodoItem key={item.id} onClick={handleClick(item.id)} {...item} />
        ))
      ) : (
        <div>No tasks created from your address yet.</div>
      )}
    </div>
  );
};

export default TodoList;
