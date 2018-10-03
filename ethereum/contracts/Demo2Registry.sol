pragma solidity ^0.4.22;

import "./Ownable.sol";
import "./SafeMath.sol";

contract Demo2Registry is Ownable {

    using SafeMath for uint256;

    event AssetCreated(string name, string author, string description, uint256 assetId, address assetOwner);
    event AssetUpdated(string name, string author, string description, uint256 assetId, address assetOwner);

    struct Asset {
        string name;
        string author;
        string description;
        uint256 assetId;
        address assetOwner;
    }

    mapping (uint256 => Asset) public assets;
    uint256 private numAssets_;

    function createAsset(string _name, string _author, string _description) public onlyOwner {
        numAssets_ = numAssets_.add(1);
        assets[numAssets_] = Asset(_name, _author, _description, numAssets_, msg.sender);
        emit AssetCreated(_name, _author, _description, numAssets_, msg.sender);
    }

    function updateAsset(uint256 _assetId, string _name, string _author, string _description) public onlyOwner {
        require(_assetId > 0 && _assetId <= numAssets_);
        Asset storage asset = assets[_assetId];
        asset.name = _name;
        asset.author = _author;
        asset.description = _description;
        emit AssetUpdated(asset.name, asset.author, asset.description, asset.assetId, asset.assetOwner);
    }
    
}