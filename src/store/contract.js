import ToDoListJson from "../contracts/ToDoList.json";

export const initContract = (web3, networkId) => {
  const contractAddress = ToDoListJson.networks[networkId]
    ? ToDoListJson.networks[networkId].address
    : false;

  if (!contractAddress) {
    console.error("Unknown network id", networkId);
    throw new Error(`Currently selected network is not supported. 
    Change to Ropsten or Rinkeby.`);
  }

  return new web3.eth.Contract(ToDoListJson.abi, contractAddress);
};

export const getTodos = (contract, web3) => async () => {
  const ids = await contract.methods.getIds().call({
    from: web3.eth.defaultAccount
  });

  if (!ids || ids.length === 0) {
    return [];
  }

  const todos = await Promise.all(
    ids.map(async id => {
      return await contract.methods.getById(id).call({
        from: web3.eth.defaultAccount
      });
    })
  );

  return todos;
};

export const createTodo = (contract, web3) => async (title, depositEth) => {
  const receipt = await contract.methods.create(title).send({
    from: web3.eth.defaultAccount,
    value: web3.utils.toWei(Number(depositEth).toString())
  });

  return receipt;
};

export const markTodoAsDone = (contract, web3) => async id => {
  const receipt = await contract.methods.markAsDone(id).send({
    from: web3.eth.defaultAccount
  });

  return receipt;
};

export const subscribeToNewTodos = (contract, web3) => callback => {
  return contract.events
    .NewToDo({filter: {owner: web3.eth.defaultAccount}})
    .on("data", event => {
      callback(null, event.returnValues);
    })
    .on("error", error => callback(error));
};

export const subscribeToMarkAsDone = contract => callback => {
  return contract.events
    .MarkedAsDone()
    .on("data", event => {
      callback(null, event.returnValues);
    })
    .on("error", error => callback(error));
};
