pragma solidity 0.5.16;

contract Ownable {
    address payable public owner;

    constructor() public {
        owner = msg.sender;
    }

    function kill() external {
        require(msg.sender == owner, "Only the owner can kill this contract");
        require(address(this).balance == 0, "Empty the contract balance first");
        selfdestruct(owner);
    }
}
