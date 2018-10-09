import { Injectable } from '@nestjs/common';
import { Wallet } from './interfaces/wallet.interface';

import * as Web3 from 'web3';

var web3 = new Web3('ws://localhost:7545');
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
var walletContract = new web3.eth.Contract(abiWallet, addrWallet);
var initialAddress = '0x235e90B0bB3F4c0875a96456d451a5733fb3C025';
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
                .then(() => walletContract.getPastEvents('AddressAdded', { fromBlock: 0, toBlock: 'latest' }), reject)
                .then(events => {
                    let wallets: Wallet[] = [];
                    if (events.length > 0) {
                        let userAddresses: string[] = events[events.length - 1].returnValues.userAddresses;
                        for (let address of userAddresses) {
                            let wallet: Wallet = { id: address };
                            wallets.push(wallet);
                        }
                    }
                    resolve(wallets);
                }, reject)
                .then(resolve, reject);
        });
    }

}   
