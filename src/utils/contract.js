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

export const createTodo = async (title, valueEth) => {
  if (!contract) {
    const success = await initContract();
    if (!success) {
      return;
    }
  }
  const web3 = getWeb3();

  const receipt = await contract.methods.create(title).send({
    from: web3.eth.defaultAccount,
    value: web3.utils.toWei(Number(valueEth).toString())
  });

  console.log(receipt);

  return receipt;
};

export const getTodos = async () => {
  if (!contract) {
    const success = await initContract();
    if (!success) {
      return;
    }
  }

  const ids = await contract.methods.getIds().call();

  console.log(ids);

  const todos = ids.map(async id => {
    return await contract.methods.getById(id).call();
  });

  console.log(todos);

  return todos;
};
