import {getTodos} from "../utils/contract";

const TODOS_FETCHING = "todos/FETCHING";
const TODOS_FETCHED = "todos/FETCHED";
const TODOS_SET = "todos/SET";

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
    case TODOS_SET:
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
};

// actions
const setTodos = items => ({
  type: TODOS_SET,
  payload: items
});

export const fetchTodos = () => async dispatch => {
  dispatch({type: TODOS_FETCHING});
  const items = await getTodos();
  dispatch(setTodos(items));
  dispatch({type: TODOS_FETCHED});
};

export const markTodoAsDone = id => async dispatch => {
  // todo
};

// selectors
const selectTodos = state => state.todos || {};
export const selectTodoIsFetching = state => selectTodos(state).isFetching;
export const selectTodoItems = state => selectTodos(state).items;
