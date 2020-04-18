import {selectWeb3} from "../account/selectors";
import {formatBalance} from "../../utils";

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
