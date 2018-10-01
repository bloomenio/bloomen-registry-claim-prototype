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
var abiRegistry = [
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
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
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "assets",
      "outputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "author",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "assetId",
          "type": "uint256"
        },
        {
          "name": "assetOwner",
          "type": "address"
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
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "author",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "assetId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "AssetCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "author",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "assetId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "AssetUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_author",
          "type": "string"
        },
        {
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "createAsset",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_assetId",
          "type": "uint256"
        }
      ],
      "name": "getAsset",
      "outputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "author",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "assetId",
          "type": "uint256"
        },
        {
          "name": "assetOwner",
          "type": "address"
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
          "name": "_assetId",
          "type": "uint256"
        },
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_author",
          "type": "string"
        },
        {
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "updateAsset",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

var addrWallet = '0xc5494d3540ff7d4107b03b4c2f490d267964df1a';

// initialization of the Demo2Wallet contract
var walletContract = new web3.eth.Contract(abiWallet, addrWallet);

// ganache account
accountAddress = "0xE0FeE2336a7c23f75acea2be3917ebc9AC7a1156";
// if we want to create a new account
// web3.eth.personal.newAccount("password")
// web3.eth.personal.unlockAccount(accountAddress, "password", 600);
// but we need to supply funds

walletContract.methods.createAddress(accountAddress).send({from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025', gas: 100000000}, function(error, result) {
    console.log(error);
    console.log(result);

    walletContract.methods.getRegistryAddress(accountAddress).call({from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025'}, function(error, result) {
        console.log(error);
        console.log(result);

        var registryContract = new web3.eth.Contract(abiRegistry, result);

        // subscription to AssetCreated event
        registryContract.events.AssetCreated({}, (error, data) => {
          if (error)
          console.log(error);
          else
          console.log(data.returnValues);
        });
        // subscription to AssetUpdated event
        registryContract.events.AssetUpdated({}, (error, data) => {
          if (error)
          console.log(error);
          else
          console.log(data.returnValues);
        });

        registryContract.methods.createAsset("Cancion", "Autor", "Descripcion").send({from: accountAddress, gas: 1000000}, function(error, result) {
          console.log(error);
          console.log(result);
  
          registryContract.methods.updateAsset(1, "Song", "Author", "Description").send({from: accountAddress, gas: 1000000}, function(error, result) {
            console.log(error);
            console.log(result);

            // inspect all events
            registryContract.getPastEvents('AllEvents', {fromBlock: 0, toBlock: 'latest'}, (err, events) => {
                console.log(events);
            });
          });
          registryContract.methods.assets(1).call({from: accountAddress}, function(error, result) {
            console.log(error);
            console.log(result);
          });
        });
      });
});