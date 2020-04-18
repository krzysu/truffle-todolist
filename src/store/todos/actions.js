import {
  getTodos,
  createTodo,
  markTodoAsDone,
  subscribeToMarkAsDone,
  subscribeToNewTodos
} from "../contract";
import {selectWeb3, selectContract} from "../account/selectors";
import {
  TODOS_FETCHING,
  TODOS_FETCHED,
  SET_TODOS,
  SET_TODO_DONE,
  SET_NEW_TODO
} from "./reducer";

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
