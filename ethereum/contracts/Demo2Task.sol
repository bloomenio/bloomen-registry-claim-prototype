pragma solidity ^0.4.22;

import "./Ownable.sol";
import "./SafeMath.sol";
import "./Demo2Claim.sol";
import "./Structs.sol";

contract Demo2Task is Ownable, Structs {
    
    using SafeMath for uint256;

    event TaskCreated(string description, address to, uint256 taskId, uint256 claimId, address claimOwner, address from);
    event TaskUpdated(string description, address to, uint256 taskId, uint256 claimId, address claimOwner, address from);

    modifier onlyClaim() {
        require(msg.sender == claimAddress);
        _;
    }

    address public claimAddress;

    mapping (uint256 => Task) public tasks;
    uint256 public tasksNumber;

    function createTask(string _description, address _to, uint256 _claimId, address _claimOwner) public onlyClaim {
        tasksNumber = tasksNumber.add(1);
        tasks[tasksNumber] = Task(_description, _to, tasksNumber, _claimId, _claimOwner, _claimOwner);
        emit TaskCreated(_description, _to, tasksNumber, _claimId, _claimOwner, _claimOwner);
    }

    function updateTask(uint256 _taskId, string _description, address _to) public onlyOwner {
        require(_taskId > 0);
        Task storage task = tasks[_taskId];
        task.description = _description;
        task.to = _to;
        emit TaskUpdated(task.description, task.to, task.taskId, task.claimId, task.claimOwner, task.from);
    }

    function setClaimAddress(address _claimAddress) public {
        claimAddress = _claimAddress;
    }

}