import {getWeb3} from "./web3";
import ToDoListJson from "../contracts/ToDoList.json";

let contract;

const initContract = async () => {
  const web3 = getWeb3();
  const networkId = await web3.eth.net.getId();

  const contractAddress = ToDoListJson.networks[networkId]
    ? ToDoListJson.networks[networkId].address
    : false;

  if (!contractAddress) {
    console.warn("Unknown network id", networkId);
    return false;
  }

  contract = new web3.eth.Contract(ToDoListJson.abi, contractAddress);
  return true;
};

export const getTodos = async () => {
  if (!contract) {
    const success = await initContract();
    if (!success) {
      return;
    }
  }

  const ids = await contract.methods.getIds().call();

  if (!ids || ids.length === 0) {
    return [];
  }

  const todos = await Promise.all(
    ids.map(async id => {
      return await contract.methods.getById(id).call();
    })
  );

  return todos;
};

export const createTodo = async (title, depositEth) => {
  if (!contract) {
    const success = await initContract();
    if (!success) {
      return;
    }
  }
  const web3 = getWeb3();

  try {
    const receipt = await contract.methods.create(title).send({
      from: web3.eth.defaultAccount,
      value: web3.utils.toWei(Number(depositEth).toString())
    });

    return receipt;
  } catch (error) {
    console.error(error);
  }
};

export const markTodoAsDone = async id => {
  if (!contract) {
    const success = await initContract();
    if (!success) {
      return;
    }
  }
  const web3 = getWeb3();
  const receipt = await contract.methods.markAsDone(id).send({
    from: web3.eth.defaultAccount
  });

  return receipt;
};

export const subscribeToNewTodos = callback => {
  const web3 = getWeb3();

  return contract.events
    .NewToDo({filter: {owner: web3.eth.defaultAccount}})
    .on("data", event => {
      callback(null, event.returnValues);
    })
    .on("error", error => callback(error));
};

export const subscribeToMarkAsDone = callback => {
  return contract.events
    .MarkedAsDone()
    .on("data", event => {
      callback(null, event.returnValues);
    })
    .on("error", error => callback(error));
};
