pragma solidity ^0.4.22;

import "./Demo2Claim.sol";
import "./Demo2Registry.sol";
import "./Demo2Task.sol";

contract Demo2Wallet {

    event AddressAdded(address[] userAddresses);

    struct User {
        address addr;
        address claimContract;
        address registryContract;
        address taskContract;
    }

    mapping (address => User) private usersMap;
    address[] private userAddresses;

    function getAddress() public view returns(address[]) {
        return userAddresses;
    }

    function createAddress(address _newAddress) public {
        require(_newAddress != address(0));
        Demo2Claim demo2Claim = new Demo2Claim();
        demo2Claim.transferOwnership(_newAddress);
        Demo2Registry demo2Registry = new Demo2Registry();
        demo2Registry.transferOwnership(_newAddress);
        Demo2Task demo2Task = new Demo2Task();
        demo2Task.transferOwnership(_newAddress);
        User memory user = User(_newAddress, address(demo2Claim), address(demo2Registry), address(demo2Task));
        usersMap[_newAddress] = user;
        userAddresses.push(_newAddress);
        emit AddressAdded(userAddresses);
    }

    function getClaimAddress(address _userAddress) public view returns(address) {
        User memory user = usersMap[_userAddress];
        return user.claimContract;
    }

    function getRegistryAddress(address _userAddress) public view returns(address) {
        User memory user = usersMap[_userAddress];
        return user.registryContract;
    }

    function getTaskAddress(address _userAddress) public view returns(address) {
        User memory user = usersMap[_userAddress];
        return user.taskContract;
    }

}