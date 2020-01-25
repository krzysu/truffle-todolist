const truffleAssert = require("truffle-assertions");
const ToDoList = artifacts.require("ToDoList");

contract("ToDoList", accounts => {
  describe("create", () => {
    it("should create a few items", async () => {
      const contract = await ToDoList.deployed();

      // account 0
      await contract.create("todo item from account 0", {
        value: 1e18,
        from: accounts[0]
      });

      // account 1
      await contract.create("todo item 1 from account 1", {
        value: 1e18,
        from: accounts[1]
      });

      const currentBalance = await web3.eth.getBalance(contract.address);
      assert.equal(currentBalance, 2e18, "amount is not correct");
    });

    it("should emit NewToDo event", async () => {
      const contract = await ToDoList.deployed();

      const tx = await contract.create("todo item 2 from account 1", {
        value: 1e18,
        from: accounts[1]
      });

      truffleAssert.eventEmitted(tx, "NewToDo", event => {
        return (
          event.title === "todo item 2 from account 1" &&
          web3.utils.fromWei(event.deposit) === "1" && // eter
          event.id.toNumber() === 2
        );
      });
    });

    it("must not create a new item if deposit was not provided", async () => {
      const contract = await ToDoList.deployed();

      await truffleAssert.reverts(
        contract.create("new item", {from: accounts[0]})
      );
    });
  });

  describe("getIds", () => {
    it("should return only ids of items from sender account", async () => {
      const contract = await ToDoList.deployed();
      const ids0 = await contract.getIds.call({from: accounts[0]});
      const ids1 = await contract.getIds.call({from: accounts[1]});

      assert.deepEqual(
        ids0.map(id => id.toNumber()),
        [0],
        "contract returned wrong ids"
      );
      assert.deepEqual(
        ids1.map(id => id.toNumber()),
        [1, 2],
        "contract returned wrong ids"
      );
    });
  });

  describe("getById", () => {
    it("should return details of requested item if account is the owner", async () => {
      const contract = await ToDoList.deployed();

      // account 1 owns item 1
      const {title, deposit, isDone} = await contract.getById(1, {
        from: accounts[1]
      });

      assert.equal(
        title,
        "todo item 1 from account 1",
        "contract returned wrong item"
      );
      assert.equal(
        web3.utils.fromWei(deposit),
        "1", // 1 eter
        "contract returned wrong item"
      );
      assert.equal(isDone, false, "contract returned wrong item");
    });

    it("must not allow to get item that account is not owner of", async () => {
      const contract = await ToDoList.deployed();

      // account 0 doesn't own item 1
      await truffleAssert.reverts(contract.getById(1, {from: accounts[0]}));
    });
  });

  describe("markAsDone", () => {
    it("should mark item as done and emit event", async () => {
      const contract = await ToDoList.deployed();

      const tx = await contract.markAsDone(1, {from: accounts[1]});

      const {isDone} = await contract.getById.call(1, {
        from: accounts[1]
      });

      assert.equal(isDone, true, "item was not marked as done");

      truffleAssert.eventEmitted(tx, "MarkedAsDone", event => {
        return event.id.toNumber() === 1;
      });
    });

    it("should send back the deposit", async () => {
      const contract = await ToDoList.deployed();
      const account = accounts[1];

      // create item with id 3
      await contract.create("todo item", {
        value: 1e18, // 1eth
        from: account
      });

      const balanceBefore = await web3.eth.getBalance(account);
      const balanceBeforeEth = parseFloat(
        web3.utils.fromWei(balanceBefore),
        10
      );
      await contract.markAsDone(3, {from: account});
      const balanceAfter = await web3.eth.getBalance(account);
      const balanceAfterEth = parseFloat(web3.utils.fromWei(balanceAfter), 10);

      assert.equal(balanceAfter > balanceBefore, true, "amount is not correct");
      assert.equal(
        Math.round(balanceAfterEth - balanceBeforeEth),
        1,
        "amount is not correct"
      );
    });

    it("must not allow non-owner to mark item as done", async () => {
      const contract = await ToDoList.deployed();

      // account 0 doesn't own item 1
      await truffleAssert.reverts(
        contract.markAsDone(1, {from: accounts[0]}),
        "Sender is not the owner"
      );
    });

    it("must not allow to mark as done twice", async () => {
      const contract = await ToDoList.deployed();

      // item 1 was marked as done in previous test
      await truffleAssert.reverts(
        contract.markAsDone(1, {from: accounts[1]}),
        "Already marked as done"
      );
    });
  });
});
