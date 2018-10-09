pragma solidity ^0.4.22;

import "./Ownable.sol";
import "./SafeMath.sol";
import "./Demo2Claim.sol";

contract Demo2Task is Ownable {
    
    using SafeMath for uint256;

    event TaskCreated(string description, address to, uint256 taskId, uint256 claimId, address claimOwner, address from);
    event TaskUpdated(string description, address to, uint256 taskId, uint256 claimId, address claimOwner, address from);

    struct Task {
        string description;
        address to;
        uint256 taskId;
        uint256 claimId;
        address claimOwner;
        address from;
    }

    modifier onlyClaim() {
        require(msg.sender == claimAddress);
        _;
    }

    address public claimAddress;

    mapping (uint256 => Task) public tasks;
    uint256 private numTasks_;

    function createTask(string _description, address _to, uint256 _claimId, address _claimOwner) public onlyClaim {
        uint256 taskId = numTasks_.add(1);
        tasks[taskId] = Task(_description, _to, taskId, _claimId, _claimOwner, msg.sender);
        emit TaskCreated(_description, _to, taskId, _claimId, _claimOwner, msg.sender);
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