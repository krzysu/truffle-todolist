pragma solidity ^0.5.11;

contract ToDoList {
    struct ToDo {
        string title;
        uint256 deposit;
        bool isDone;
    }

    ToDo[] private todos;

    mapping(uint256 => address) todoOwners;
    mapping(address => uint256) ownerTodosCount;

    // to create a new todo item sender has to send some ether that will be released when todo is done
    function create(string memory _title) public payable {
        require(msg.value > 0, "Some ether is required");
        todos.push(ToDo(_title, msg.value, false));
        todoOwners[todos.length - 1] = msg.sender;
        ownerTodosCount[msg.sender]++;
    }

    // return sender todo ids
    function getIds() public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](ownerTodosCount[msg.sender]);
        uint256 counter = 0;
        for (uint256 i = 0; i < todos.length; i++) {
            if (todoOwners[i] == msg.sender) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getById(uint256 _id)
        public
        view
        returns (string memory, uint256, bool)
    {
        require(msg.sender == todoOwners[_id], "Sender is not the owner");
        ToDo storage todo = todos[_id];
        return (todo.title, todo.deposit, todo.isDone);
    }

    function markAsDone(uint256 _id) public {
        require(msg.sender == todoOwners[_id], "Sender is not the owner");
        ToDo storage todo = todos[_id];
        todo.isDone = true;
    }
}
