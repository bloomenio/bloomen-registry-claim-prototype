pragma solidity ^0.4.22;

import "./Ownable.sol";
import "./SafeMath.sol";

contract Demo2Task is Ownable {
    
    using SafeMath for uint256;

    event TaskCreated(string description, address to, uint256 issueId, uint256 claimId, address claimOwner, address from);
    event TaskUpdated(string description, address to);

    struct Task {
        string description;
        address to;
        uint256 issueId;
        uint256 claimId;
        address claimOwner;
        address from;
    }

    mapping (uint256 => Task) public tasks;
    uint256 private numTasks;

    function createTask(string _description, address _to, uint256 _issueId, uint256 _claimId, address _claimOwner) public onlyOwner {
        uint256 taskId = numTasks.add(1);
        tasks[taskId] = Task(_description, _to, _issueId, _claimId, _claimOwner, msg.sender);
        emit TaskCreated(_description, _to, _issueId, _claimId, _claimOwner, msg.sender);
    }

    function updateTask(uint256 _taskId, string _description, address _to) public onlyOwner {
        require(_taskId > 0);
        Task storage task = tasks[_taskId];
        task.description = _description;
        task.to = _to;
        emit TaskUpdated(task.description, task.to);
    }

}