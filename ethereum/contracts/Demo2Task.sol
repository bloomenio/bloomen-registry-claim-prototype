pragma solidity ^0.4.22;

import "./Ownable.sol";
import "./SafeMath.sol";
import "./Demo2Claim.sol";
import "./Structs.sol";
import "./EventManager.sol";

contract Demo2Task is Ownable, Structs {
    
    using SafeMath for uint256;

    mapping (uint256 => Task) public tasks;
    uint256 public tasksNumber;

    EventManager private eventManager_;

    constructor(EventManager _eventManager) public {
        eventManager_ = _eventManager;
    }

    function createTask(string _description, address _to, uint256 _claimId, address _claimOwner) public {
        tasksNumber = tasksNumber.add(1);
        tasks[tasksNumber] = Task(_description, _to, tasksNumber, _claimId, _claimOwner, _claimOwner);
        eventManager_.emitTaskCreated(_description, _to, tasksNumber, _claimId, _claimOwner, _claimOwner);
    }

    function updateTask(uint256 _taskId, string _description, address _to) public onlyOwner {
        require(_taskId > 0);
        Task storage task = tasks[_taskId];
        task.description = _description;
        task.to = _to;
        eventManager_.emitTaskUpdated(task.description, task.to, task.taskId, task.claimId, task.claimOwner, task.from);
    }

}
