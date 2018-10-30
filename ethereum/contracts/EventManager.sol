pragma solidity ^0.4.22;

contract EventManager {

    event AddressAdded(address[] userAddresses);

    event AssetCreated(string name, string author, string description, uint256 assetId, address assetOwner);
    event AssetUpdated(string name, string author, string description, uint256 assetId, address assetOwner);

    event ClaimCreated(uint256 assetId, address assetOwner, string description, uint256 claimId, address claimOwner);
    event ClaimUpdated(uint256 assetId, address assetOwner, string description, uint256 claimId, address claimOwner);

    event TaskCreated(string description, address to, uint256 taskId, uint256 claimId, address claimOwner, address from);
    event TaskUpdated(string description, address to, uint256 taskId, uint256 claimId, address claimOwner, address from);

    function emitAddressAdded(address[] _userAddresses) public {
        emit AddressAdded(_userAddresses);
    }

    function emitAssetCreated(string _name, string _author, string _description, uint256 _assetId, address _assetOwner) public {
        emit AssetCreated(_name, _author, _description, _assetId, _assetOwner);
    }

    function emitAssetUpdated(string _name, string _author, string _description, uint256 _assetId, address _assetOwner) public {
        emit AssetUpdated(_name, _author, _description, _assetId, _assetOwner);
    }

    function emitClaimCreated(uint256 _assetId, address _assetOwner, string _description, uint256 _claimId, address _claimOwner) public {
        emit ClaimCreated(_assetId, _assetOwner, _description, _claimId, _claimOwner);
    }

    function emitClaimUpdated(uint256 _assetId, address _assetOwner, string _description, uint256 _claimId, address _claimOwner) public {
        emit ClaimUpdated(_assetId, _assetOwner, _description, _claimId, _claimOwner);
    }

    function emitTaskCreated(string _description, address _to, uint256 _taskId, uint256 _claimId, address _claimOwner, address _from) public {
        emit TaskCreated(_description, _to, _taskId, _claimId, _claimOwner, _from);
    }

    function emitTaskUpdated(string _description, address _to, uint256 _taskId, uint256 _claimId, address _claimOwner, address _from) public {
        emit TaskUpdated(_description, _to, _taskId, _claimId, _claimOwner, _from);
    }

}
