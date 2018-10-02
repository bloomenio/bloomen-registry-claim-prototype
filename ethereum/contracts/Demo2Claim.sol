pragma solidity ^0.4.22;

import "./Ownable.sol";
import "./SafeMath.sol";

contract Demo2Claim is Ownable {

    using SafeMath for uint256;

    event ClaimCreated(uint256 _assetId, address _assetOwner, string _description, uint256 _id, uint256 _claimId, address _claimOwner);
    event ClaimUpdated(uint256 _assetId, address _assetOwner, string _description);

    struct Claim {
        uint256 assetId;
        address assetOwner;
        string description;
        uint256 id;
        uint256 claimId;
        address claimOwner;
    }

    mapping (uint256 => Claim) public claims;
    uint256 private numClaims;

    function createClaim(uint256 _assetId, address _assetOwner, string _description, uint256 _id) public onlyOwner {
        uint256 claimId = numClaims.add(1);
        claims[claimId] = Claim(_assetId, _assetOwner, _description, _id, claimId, msg.sender);
        emit ClaimCreated(_assetId, _assetOwner, _description, _id, claimId, msg.sender);
    }

    function updateClaim(uint256 _claimId, uint256 _assetId, address _assetOwner, string _description) public onlyOwner {
        require(_claimId > 0);
        Claim storage claim = claims[_claimId];
        claim.assetId = _assetId;
        claim.assetOwner = _assetOwner;
        claim.description = _description;
        emit ClaimUpdated(claim.assetId, claim.assetOwner, claim.description);
    }
}