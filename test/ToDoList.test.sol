pragma solidity ^0.5.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ToDoList.sol";

contract TestToDoList {
    ToDoList todolist;

    function beforeAll() public {
        todolist = ToDoList(DeployedAddresses.ToDoList());
    }

    function testCreateNewItem() public {
        string memory title = "test item";
        todolist.create.value(1 ether)(title);
        Assert.equal(uint256(1), uint256(2), "First test");
    }

}
