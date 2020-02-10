pragma solidity >=0.5.0 <0.7.0;

import "./Ownable.sol";


contract ToDoList is Ownable {
    event NewToDo(
        address indexed owner,
        string title,
        uint256 deposit,
        uint8 id
    );
    event MarkedAsDone(uint8 id);

    struct ToDo {
        string title;
        uint256 deposit;
        bool isDone;
    }

    ToDo[] private todos;

    mapping(uint8 => address) todoOwners;
    mapping(address => uint8) ownerTodosCount;

    // to create a new todo item sender has to send some ether that will be released when todo is done
    function create(string memory _title) public payable {
        require(msg.value > 0, "Some ether is required");
        todos.push(ToDo(_title, msg.value, false));
        uint8 id = uint8(todos.length - 1);
        todoOwners[id] = msg.sender;
        ownerTodosCount[msg.sender]++;
        emit NewToDo(msg.sender, _title, msg.value, id);
    }

    // return sender todo ids
    function getIds() public view returns (uint8[] memory) {
        uint8[] memory result = new uint8[](ownerTodosCount[msg.sender]);
        uint8 counter = 0;
        for (uint8 i = 0; i < todos.length; i++) {
            if (todoOwners[i] == msg.sender) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getById(uint8 _id)
        public
        view
        returns (uint8 id, string memory title, uint256 deposit, bool isDone)
    {
        require(msg.sender == todoOwners[_id], "Sender is not the owner");
        ToDo storage todo = todos[_id];
        return (_id, todo.title, todo.deposit, todo.isDone);
    }

    function markAsDone(uint8 _id) public {
        ToDo storage todo = todos[_id];
        require(msg.sender == todoOwners[_id], "Sender is not the owner");
        require(todo.isDone == false, "Already marked as done");
        todo.isDone = true;
        // msg.sender.call.value(todo.deposit);
        msg.sender.transfer(todo.deposit);
        emit MarkedAsDone(_id);
    }
}
