pragma solidity ^0.4.22;

import "./Ownable.sol";
import "./SafeMath.sol";
import "./Demo2Wallet.sol";
import "./Structs.sol";
import "./EventManager.sol";

contract Demo2Registry is Ownable, Structs {

    using SafeMath for uint256;

    mapping (uint256 => Asset) public assets;
    uint256 public assetsNumber;

    EventManager private eventManager_;

    constructor(EventManager _eventManager) public {
        eventManager_ = _eventManager;
    }

    function createAsset(string _name, string _author, string _description) public onlyOwner {
        assetsNumber = assetsNumber.add(1);
        assets[assetsNumber] = Asset(_name, _author, _description, assetsNumber, msg.sender);
        eventManager_.emitAssetCreated(_name, _author, _description, assetsNumber, msg.sender);
    }

    function updateAsset(uint256 _assetId, string _name, string _author, string _description) public onlyOwner {
        require(_assetId > 0 && _assetId <= assetsNumber);
        Asset storage asset = assets[_assetId];
        asset.name = _name;
        asset.author = _author;
        asset.description = _description;
        eventManager_.emitAssetUpdated(asset.name, asset.author, asset.description, asset.assetId, asset.assetOwner);
    }
    
}
