import { Injectable } from '@nestjs/common';
import { Wallet } from './interfaces/wallet.interface';

import * as Web3 from 'web3';
var fs = require('fs');

var web3 = new Web3('ws://localhost:7545');

var walletFile = "../ethereum/build/contracts/Demo2Wallet.json";
var compiledWallet = JSON.parse(fs.readFileSync(walletFile, 'utf8'));
var abiWallet = compiledWallet.abi;

var addrWallet = "0xc5494d3540ff7d4107b03b4c2f490d267964df1a";
var walletContract = new web3.eth.Contract(abiWallet, addrWallet);
var initialAddress = "0x235e90B0bB3F4c0875a96456d451a5733fb3C025";
var accountAddress = "0xE0FeE2336a7c23f75acea2be3917ebc9AC7a1156";

@Injectable()
export class WalletService {

    getWallet(): Promise<Wallet[]> {
        return new Promise<Wallet[]>((resolve, reject) => {

            walletContract.methods.getAddress().call({ from: initialAddress })
                .then(userAddresses => {
                    let wallets: Wallet[] = [];
                    for (let address of userAddresses) {
                        let wallet: Wallet = { id: address };
                        wallets.push(wallet);
                    }
                    resolve(wallets);
                }, reject);
        });
    }

    postWallet(): Promise<Wallet[]> {
        return new Promise<Wallet[]>((resolve, reject) => {

            walletContract.methods.createAddress(accountAddress).send({ from: initialAddress, gas: 100000000 })
                .then(() => {
                    walletContract.methods.getAddress().call({ from: initialAddress })
                        .then(userAddresses => {
                            let wallets: Wallet[] = [];
                            for (let address of userAddresses) {
                                let wallet: Wallet = { id: address };
                                wallets.push(wallet);
                            }
                            resolve(wallets);
                        }, reject);
                }, reject);
        });
    }

}
