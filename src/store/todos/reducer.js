import {DISCONNECTED} from "../account/reducer";

export const TODOS_FETCHING = "todos/FETCHING";
export const TODOS_FETCHED = "todos/FETCHED";
export const SET_TODOS = "todos/SET";
export const SET_TODO_DONE = "todos/SET_TODO_DONE";
export const SET_NEW_TODO = "todos/SET_NEW_TODO";

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
