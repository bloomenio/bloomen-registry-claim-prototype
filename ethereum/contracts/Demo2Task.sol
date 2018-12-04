pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./Ownable.sol";
import "./SafeMath.sol";
import "./Strings.sol";
import "./Demo2Claim.sol";
import "./Structs.sol";
import "./EventManager.sol";

contract Demo2Task is Ownable, Structs {
    
    using SafeMath for uint256;
    using Strings for *;

    mapping (uint256 => Task) public tasks;
    mapping (uint256 => string[]) private histories_;
    uint256 public tasksNumber;

    EventManager private eventManager_;

    constructor(EventManager _eventManager) public {
        eventManager_ = _eventManager;
        tasksNumber = 0;
    }

    function getHistories(uint256 _index) public view returns(string[]) {
        return histories_[_index];
    }

    function createTask(string _description, address _to, uint256 _claimId, address _claimOwner) public {
        tasksNumber = tasksNumber.add(1);
        tasks[tasksNumber] = Task(_description, _to, tasksNumber, _claimId, _claimOwner, _claimOwner);
        histories_[tasksNumber] = new string[](0);
        histories_[tasksNumber].push(_description);
        eventManager_.emitTaskCreated(_description, _to, tasksNumber, _claimId, _claimOwner, _claimOwner);
    }

    function updateTask(uint256 _taskId, string _description, address _to) public onlyOwner {
        require(_taskId > 0);
        Task storage task = tasks[_taskId];
        task.description = _description;
        task.to = _to; 
        histories_[_taskId].push(_description);
        eventManager_.emitTaskUpdated(task.description, task.to, task.taskId, task.claimId, task.claimOwner, task.from);
    }

}
