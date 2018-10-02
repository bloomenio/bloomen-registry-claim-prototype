var Web3 = require('web3');

// connection with ganache
var web3 = new Web3('ws://localhost:7545');

// the ABI of the Demo2Wallet contract
var abiWallet = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "userAddresses",
          "type": "address[]"
        }
      ],
      "name": "AddressAdded",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAddress",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newAddress",
          "type": "address"
        }
      ],
      "name": "createAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "getClaimAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "getRegistryAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "getTaskAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];

var addrWallet = '0xc5494d3540ff7d4107b03b4c2f490d267964df1a';

// initialization of the Demo2Wallet contract
var walletContract = new web3.eth.Contract(abiWallet, addrWallet);

// subscription to the AddressAdded event
walletContract.events.AddressAdded({}, (error, data) => {
    if (error)
    console.log(error);
    else
    console.log(data.returnValues);
});

// ganache account
accountAddress = "0xE0FeE2336a7c23f75acea2be3917ebc9AC7a1156";
// if we want to create a new account
// web3.eth.personal.newAccount("password")
// web3.eth.personal.unlockAccount(accountAddress, "password", 600);
// but we need to supply funds

walletContract.methods.createAddress(accountAddress).send({from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025', gas: 100000000}, function(error, result) {
    console.log(error);
    console.log(result);

    walletContract.methods.getAddress().call({from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025'}, function(error, result) {
      console.log(error);
      console.log(result);
    });
  
    walletContract.methods.getRegistryAddress(accountAddress).call({from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025'}, function(error, result) {
      console.log(error);
      console.log(result);
    });
    walletContract.methods.getClaimAddress(accountAddress).call({from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025'}, function(error, result) {
        console.log(error);
        console.log(result);
    });
    walletContract.methods.getTaskAddress(accountAddress).call({from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025'}, function(error, result) {
        console.log(error);
        console.log(result);
    });
});

// inspect all events
walletContract.getPastEvents('AddressAdded', {fromBlock: 0, toBlock: 'latest'}, (err, events) => {
    console.log(events);
});