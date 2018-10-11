pragma solidity ^0.4.22;

contract Structs {

    struct User {
        address addr;
        address claimContract;
        address registryContract;
        address taskContract;
    }

    struct Asset {
        string name;
        string author;
        string description;
        uint256 assetId;
        address assetOwner;
    }

        struct Claim {
        uint256 assetId;
        address assetOwner;
        string description;
        uint256 claimId;
        address claimOwner;
    }

    struct Task {
        string description;
        address to;
        uint256 taskId;
        uint256 claimId;
        address claimOwner;
        address from;
    }

}