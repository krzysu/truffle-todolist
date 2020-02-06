import {getWeb3, getAddress} from "./web3";
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
  const address = await getAddress();

  const receipt = await contract.methods.create(title).send({
    from: address,
    value: web3.utils.toWei(Number(valueEth).toString())
  });

  console.log(receipt);

  return receipt;
};
