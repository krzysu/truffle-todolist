const ToDoList = artifacts.require("ToDoList");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(ToDoList);

  // const contract = await ToDoList.deployed();
  // contract.create("todo item from account 0", {
  //   value: "1000000000000000",
  //   from: accounts[0]
  // });
};
