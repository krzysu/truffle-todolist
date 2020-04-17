import {getTodos, createTodo, markTodoAsDone} from "./contract";
import {DISCONNECTED, selectWeb3, selectContract} from "./account";

const TODOS_FETCHING = "todos/FETCHING";
const TODOS_FETCHED = "todos/FETCHED";
const SET_TODOS = "todos/SET";
const UPDATE_TODO = "todos/UPDATE";

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

    case DISCONNECTED:
      return initialState;

    default:
      return state;
  }
};

// actions
const setTodos = items => ({
  type: SET_TODOS,
  payload: items
});

const updateTodo = (id, data) => ({
  type: UPDATE_TODO,
  payload: {id, data}
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

export const markAsDone = id => dispatch => {
  markTodoAsDone(id);
};

export const addTodo = (title, deposit) => dispatch => {
  createTodo(title, deposit);
};

// selectors
const selectTodos = state => state.todos || {};
export const selectTodoIsFetching = state => selectTodos(state).isFetching;
export const selectTodoItems = state => selectTodos(state).items;
