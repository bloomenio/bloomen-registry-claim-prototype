var Web3 = require('web3');
var fs = require('fs');

var jsonFile = "../ethereum/build/contracts/Demo2Wallet.json";
var parsed= JSON.parse(fs.readFileSync(jsonFile));
var abiWallet = parsed.abi;

var jsonFile = "../ethereum/build/contracts/Demo2Registry.json";
var parsed= JSON.parse(fs.readFileSync(jsonFile));
var abiRegistry = parsed.abi;

// connection with ganache
var web3 = new Web3('ws://localhost:7545');

var addrWallet = '0xc5494d3540ff7d4107b03b4c2f490d267964df1a';

// initialization of the Demo2Wallet contract
var walletContract = new web3.eth.Contract(abiWallet, addrWallet);

// ganache account
accountAddress = "0xE0FeE2336a7c23f75acea2be3917ebc9AC7a1156";
// if we want to create a new account
// web3.eth.personal.newAccount("password")
// web3.eth.personal.unlockAccount(accountAddress, "password", 600);
// but we need to supply funds

walletContract.methods.createAddress(accountAddress).send({ from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025', gas: 100000000 }).then((result) => {
  console.log(result);

  walletContract.methods.getRegistryAddress(accountAddress).call({ from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025' }).then((result) => {
    console.log(result);

    var registryContract = new web3.eth.Contract(abiRegistry, result);

    // subscription to AssetCreated event
    registryContract.events.AssetCreated({}, (error, data) => {
      if (error)
        console.log(error);
      else
        console.log(data.returnValues);
    });

    // subscription to AssetUpdated event
    registryContract.events.AssetUpdated({}, (error, data) => {
      if (error)
        console.log(error);
      else
        console.log(data.returnValues);
    });

    registryContract.methods.createAsset("Cancion", "Autor", "Descripcion").send({ from: accountAddress, gas: 1000000 }).then((result) => {
      console.log(result);

      registryContract.methods.updateAsset(1, "Song", "Author", "Description").send({ from: accountAddress, gas: 1000000 }).then((result) => {
        console.log(result);

        // inspect all events
        registryContract.getPastEvents('AllEvents', { fromBlock: 0, toBlock: 'latest' }).then((events) => {
          console.log(events);
        });
      });
      registryContract.methods.assets(1).call({ from: accountAddress }).then((result) => {
        console.log(result);
      });
    });
  });
});