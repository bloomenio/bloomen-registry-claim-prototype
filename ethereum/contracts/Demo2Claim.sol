pragma solidity ^0.4.22;

import "./Ownable.sol";
import "./SafeMath.sol";
import "./Demo2Task.sol";
import "./Structs.sol";
import "./EventManager.sol";

contract Demo2Claim is Ownable, Structs {

    using SafeMath for uint256;

    mapping (uint256 => Claim) public claims;
    uint256 public claimsNumber;

    Demo2Task public taskContract;

    EventManager private eventManager_;

    constructor(EventManager _eventManager) public {
        eventManager_ = _eventManager;
    }

    function createClaim(uint256 _assetId, address _assetOwner, string _description) public onlyOwner {
        claimsNumber = claimsNumber.add(1);
        claims[claimsNumber] = Claim(_assetId, _assetOwner, _description, claimsNumber, msg.sender);
        eventManager_.emitClaimCreated(_assetId, _assetOwner, _description, claimsNumber, msg.sender);
        taskContract.createTask(_description, _assetOwner, claimsNumber, msg.sender);
    }

    function updateClaim(uint256 _claimId, uint256 _assetId, address _assetOwner, string _description) public onlyOwner {
        require(_claimId > 0);
        Claim storage claim = claims[_claimId];
        claim.assetId = _assetId;
        claim.assetOwner = _assetOwner;
        claim.description = _description;
        eventManager_.emitClaimUpdated(claim.assetId, claim.assetOwner, claim.description, claim.claimId, claim.claimOwner);
    }

    function setTaskContract(Demo2Task _taskContract) public {
        taskContract = _taskContract;
    }

}
