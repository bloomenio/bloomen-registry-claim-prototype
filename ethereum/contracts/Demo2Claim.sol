pragma solidity ^0.4.22;

import "./Ownable.sol";
import "./SafeMath.sol";
import "./Demo2Task.sol";

contract Demo2Claim is Ownable {

    using SafeMath for uint256;

    event ClaimCreated(uint256 assetId, address assetOwner, string description, uint256 claimId, address claimOwner);
    event ClaimUpdated(uint256 assetId, address assetOwner, string description, uint256 claimId, address claimOwner);

    struct Claim {
        uint256 assetId;
        address assetOwner;
        string description;
        uint256 claimId;
        address claimOwner;
    }

    mapping (uint256 => Claim) public claims;
    uint256 private numClaims_;

    Demo2Task public taskContract;

    function createClaim(uint256 _assetId, address _assetOwner, string _description) public onlyOwner {
        numClaims_ = numClaims_.add(1);
        claims[numClaims_] = Claim(_assetId, _assetOwner, _description, numClaims_, msg.sender);
        emit ClaimCreated(_assetId, _assetOwner, _description, numClaims_, msg.sender);
        taskContract.createTask(_description, _assetOwner, numClaims_, msg.sender);
    }

    function updateClaim(uint256 _claimId, uint256 _assetId, address _assetOwner, string _description) public onlyOwner {
        require(_claimId > 0);
        Claim storage claim = claims[_claimId];
        claim.assetId = _assetId;
        claim.assetOwner = _assetOwner;
        claim.description = _description;
        emit ClaimUpdated(claim.assetId, claim.assetOwner, claim.description, claim.claimId, claim.claimOwner);
    }

    function setTaskContract(Demo2Task _taskContract) public {
        taskContract = _taskContract;
    }
}