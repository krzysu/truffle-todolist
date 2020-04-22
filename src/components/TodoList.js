import React, {useEffect} from "react";
import {connect} from "react-redux";
import {selectIsConnected, selectError} from "../store/account/selectors";
import {selectTodoItems, selectTodoIsFetching} from "../store/todos/selectors";
import {fetchTodos, markAsDone} from "../store/todos/actions";
import TodoItem from "./TodoItem";

const TodoList = ({
  isConnected,
  isFetching,
  error,
  items,
  fetchTodos,
  markAsDone
}) => {
  useEffect(() => {
    if (isConnected && !error) {
      fetchTodos();
    }
  }, [isConnected, fetchTodos, error]);

  const handleClick = id => () => {
    markAsDone(id);
  };

  if (error) {
    return <div style={{color: "red"}}>{error}</div>;
  }

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
  items: selectTodoItems(state),
  error: selectError(state)
});

const mapDispatchToProps = {fetchTodos, markAsDone};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
