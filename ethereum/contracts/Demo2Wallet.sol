pragma solidity ^0.4.22;

import "./Demo2Claim.sol";
import "./Demo2Registry.sol";
import "./Demo2Task.sol";
import "./Structs.sol";

contract Demo2Wallet is Structs {

    event AddressAdded(address[] userAddresses_);

    mapping (address => User) private usersMap_;
    address[] private userAddresses_;

    function getAddress() public view returns(address[]) {
        return userAddresses_;
    }

    function createAddress(address _newAddress) public {
        require(_newAddress != address(0));
        Demo2Registry demo2Registry = new Demo2Registry();

        Demo2Claim demo2Claim = new Demo2Claim();

        Demo2Task demo2Task = new Demo2Task();
        demo2Claim.setTaskContract(demo2Task);
        demo2Task.setClaimAddress(address(demo2Claim));

        demo2Registry.transferOwnership(_newAddress);
        demo2Claim.transferOwnership(_newAddress);
        demo2Task.transferOwnership(_newAddress);

        User memory user = User(_newAddress, address(demo2Claim), address(demo2Registry), address(demo2Task));
        usersMap_[_newAddress] = user;
        userAddresses_.push(_newAddress);
        emit AddressAdded(userAddresses_);
    }

    function getClaimAddress(address _userAddress) public view returns(address) {
        User memory user = usersMap_[_userAddress];
        return user.claimContract;
    }

    function getRegistryAddress(address _userAddress) public view returns(address) {
        User memory user = usersMap_[_userAddress];
        return user.registryContract;
    }

    function getTaskAddress(address _userAddress) public view returns(address) {
        User memory user = usersMap_[_userAddress];
        return user.taskContract;
    }

}