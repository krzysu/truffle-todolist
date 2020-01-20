const ToDoList = artifacts.require("ToDoList");

contract("ToDoList", accounts => {
  it("should create a new item", async () => {
    const contract = await ToDoList.deployed();
    await contract.create("test item", {value: 1e18, from: accounts[0]});

    const currentBalance = await web3.eth.getBalance(contract.address);

    console.log({currentBalance});
    assert.equal(currentBalance, 1e18, "amount is not correct");
  });
});
