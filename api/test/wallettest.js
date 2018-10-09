var Web3 = require('web3');
var Q = require('q');
var fs = require('fs');

var jsonFile = "../ethereum/build/contracts/Demo2Wallet.json";
var parsed= JSON.parse(fs.readFileSync(jsonFile));
var abi = parsed.abi;

// connection with ganache
var web3 = new Web3('ws://localhost:7545');

var addrWallet = '0xc5494d3540ff7d4107b03b4c2f490d267964df1a';

// initialization of the Demo2Wallet contract
var walletContract = new web3.eth.Contract(abi, addrWallet);

// subscription to the AddressAdded event
walletContract.events.AddressAdded({}, (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data.returnValues);
  }
});

// ganache account
accountAddress = "0xE0FeE2336a7c23f75acea2be3917ebc9AC7a1156";
// if we want to create a new account
// web3.eth.personal.newAccount("password")
// web3.eth.personal.unlockAccount(accountAddress, "password", 600);
// but we need to supply funds

walletContract.methods.createAddress(accountAddress).send({ from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025', gas: 100000000 })
  .then(result => {

    Q.all([
      walletContract.methods.getAddress().call({ from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025' }),
      walletContract.methods.getRegistryAddress(accountAddress).call({ from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025' }),
      walletContract.methods.getClaimAddress(accountAddress).call({ from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025' }),
      walletContract.methods.getTaskAddress(accountAddress).call({ from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025' }),
    ])
    .then(([address, registry, claim, task]) => {
      console.log("Address array", address);
      console.log("Registry addres", registry);
      console.log("Claim address", claim);
      console.log("Task address", task);
    }, err => {
      console.error(err);
    })
  }, error => {
    console.error(error);
  })


// inspect all events
walletContract.getPastEvents('AddressAdded', { fromBlock: 0, toBlock: 'latest' }, (err, events) => {
  if (err) {
    console.log(err);
  } else {
    console.log(events);
  }
});