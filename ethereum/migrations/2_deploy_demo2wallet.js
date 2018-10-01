// File: `./migrations/2_deploy_demo2wallet.js`

var Demo2Wallet = artifacts.require("Demo2Wallet");

module.exports = function(deployer) {
deployer.deploy(Demo2Wallet)
};
