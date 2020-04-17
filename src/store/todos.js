import {
  getTodos,
  createTodo,
  markTodoAsDone,
  subscribeToMarkAsDone,
  subscribeToNewTodos
} from "./contract";
import {DISCONNECTED, selectWeb3, selectContract} from "./account";
import {formatBalance} from "../utils";

const TODOS_FETCHING = "todos/FETCHING";
const TODOS_FETCHED = "todos/FETCHED";
const SET_TODOS = "todos/SET";
const SET_TODO_DONE = "todos/SET_TODO_DONE";
const SET_NEW_TODO = "todos/SET_NEW_TODO";

const initialState = {
  isFetching: false,
  items: []
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TODOS_FETCHING:
      return {
        ...state,
        isFetching: true
      };

    case TODOS_FETCHED:
      return {
        ...state,
        isFetching: false
      };

    case SET_TODOS:
      return {
        ...state,
        items: action.payload
      };

    case SET_TODO_DONE:
      return {
        ...state,
        items: updateItemInArray(state.items, action.payload, {isDone: true})
      };

    case SET_NEW_TODO:
      return {
        ...state,
        items: state.items.concat(action.payload)
      };

    case DISCONNECTED:
      return initialState;

    default:
      return state;
  }
};

// helpers
const updateItemInArray = (items, itemId, newValue) => {
  const itemIndex = items.findIndex(item => item.id === itemId);

  const updatedItem = {
    ...items[itemIndex],
    ...newValue
  };

  return [
    ...items.slice(0, itemIndex),
    updatedItem,
    ...items.slice(itemIndex + 1)
  ];
};

// actions
const setTodos = items => ({
  type: SET_TODOS,
  payload: items
});

const setTodoDone = id => ({
  type: SET_TODO_DONE,
  payload: id
});

const setNewTodo = data => ({
  type: SET_NEW_TODO,
  payload: data
});

export const fetchTodos = () => async (dispatch, getState) => {
  dispatch({type: TODOS_FETCHING});
  const state = getState();
  const web3 = selectWeb3(state);
  const contract = selectContract(state);
  const items = await getTodos(contract, web3)();
  dispatch(setTodos(items));
  dispatch({type: TODOS_FETCHED});
};

export const markAsDone = id => (dispatch, getState) => {
  const state = getState();
  const web3 = selectWeb3(state);
  const contract = selectContract(state);
  markTodoAsDone(contract, web3)(id);

  const markAsDoneSubscription = subscribeToMarkAsDone(contract)(
    (error, data) => {
      if (error) {
        console.error(error);
      } else {
        dispatch(setTodoDone(data.id));
      }
      markAsDoneSubscription.unsubscribe();
    }
  );
};

export const addTodo = (title, deposit) => async (dispatch, getState) => {
  const state = getState();
  const web3 = selectWeb3(state);
  const contract = selectContract(state);

  const newToDoSubscription = subscribeToNewTodos(
    contract,
    web3
  )((error, data) => {
    if (error) {
      console.error(error);
    } else {
      const {title, deposit, id} = data;
      dispatch(
        setNewTodo({
          title,
          deposit,
          id,
          isDone: false
        })
      );
    }
    newToDoSubscription.unsubscribe();
  });

  await createTodo(contract, web3)(title, deposit);
};

// selectors
const selectTodos = state => state.todos || {};

export const selectTodoIsFetching = state => selectTodos(state).isFetching;

export const selectTodoItems = state => {
  const items = selectTodos(state).items;
  const web3 = selectWeb3(state);

  return items
    .map(item => ({
      ...item,
      deposit: formatBalance(web3.utils.fromWei(item.deposit))
    }))
    .reverse();
};
