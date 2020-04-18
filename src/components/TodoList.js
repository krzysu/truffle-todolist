import React, {useEffect} from "react";
import {connect} from "react-redux";
import {selectIsConnected} from "../store/account/selectors";
import {selectTodoItems, selectTodoIsFetching} from "../store/todos/selectors";
import {fetchTodos, markAsDone} from "../store/todos/actions";
import TodoItem from "./TodoItem";

const TodoList = ({isConnected, isFetching, items, fetchTodos, markAsDone}) => {
  useEffect(() => {
    if (isConnected) {
      fetchTodos();
    }
  }, [isConnected, fetchTodos]);

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
