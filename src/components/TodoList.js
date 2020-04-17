import React, {useEffect} from "react";
import {connect} from "react-redux";
import {subscribeToNewTodos, subscribeToMarkAsDone} from "../store/contract";
import {selectIsConnected} from "../store/account";
import {
  selectTodoItems,
  selectTodoIsFetching,
  fetchTodos,
  markAsDone
} from "../store/todos";
import TodoItem from "./TodoItem";

const TodoList = ({isConnected, isFetching, items, fetchTodos, markAsDone}) => {
  useEffect(() => {
    if (isConnected) {
      fetchTodos();
    }
  }, [isConnected]);

  // useEffect(() => {
  //   if (!isConnected) {
  //     return;
  //   }
  //   const newToDoSubscription = subscribeToNewTodos((error, data) => {
  //     if (error) {
  //       console.error(error);
  //     }
  //     console.log("New item created", data);
  //   });

  //   const markAsDoneSubscription = subscribeToMarkAsDone((error, data) => {
  //     if (error) {
  //       console.error(error);
  //     }
  //     console.log("Item marked as done", data);
  //   });

  //   return () => {
  //     newToDoSubscription.unsubscribe();
  //     markAsDoneSubscription.unsubscribe();
  //   };
  // }, [isConnected]);

  const handleClick = id => () => {
    markAsDone(id);
  };

  if (!isConnected) {
    return <div>Connect your wallet to see your tasks.</div>;
  }

  if (isFetching) {
    return <div>Loading your tasks...</div>;
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

const mapStateToProps = state => ({
  isConnected: selectIsConnected(state),
  isFetching: selectTodoIsFetching(state),
  items: selectTodoItems(state)
});

const mapDispatchToProps = {fetchTodos, markAsDone};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
