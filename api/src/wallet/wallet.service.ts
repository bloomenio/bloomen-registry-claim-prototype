import { Injectable, HttpCode, HttpException } from '@nestjs/common';
import { Wallet } from './interfaces/wallet.interface';
import { Claim } from './interfaces/claim.interface';
import { Task } from './interfaces/task.interface';
import { ClaimDto } from './dto/claim.dto';
import { TaskDto } from './dto/task.dto';

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

    private readonly claims: Claim[] = [];
    private readonly tasks: Task[] = [];

    getWallet(): Promise<Wallet[]> {
        return new Promise<Wallet[]>((resolve, reject) => {

            walletContract.methods.getAddress().call({ from: '0x235e90B0bB3F4c0875a96456d451a5733fb3C025' })
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

    getClaim(add: string) {
        let x: Claim[] = [];
        for (let i = 0; i < this.claims.length; ++i) {
            if (this.claims[i].claimOwner == add) {
                x.push(this.claims[i]);
            }
        }
        return x;
    }

    postClaim(add: string, claimDto: ClaimDto) {
        var randomString = require('random-string');
        if (add != claimDto.assetOwner) {
            let x: Claim = {
                assetId: claimDto.assetId,
                assetOwner: claimDto.assetOwner,
                description: claimDto.description,
                claimId: randomString({ length: 20 }),
                issueId: randomString({ length: 20 }),
                claimOwner: add
            }
            this.claims.push(x);
            this.tasks.push({
                description: "Initial claim msg",
                to: x.assetOwner,
                from: x.claimOwner,
                issueId: x.issueId
            });
            return x;
        }
        else {
            throw HttpException;
        }
    }

    getClaimById(add: string, id: string) {
        for (let i = 0; i < this.claims.length; ++i) {
            if (this.claims[i].claimOwner == add && this.claims[i].claimId == id) {
                return this.claims[i];
            }
        }
    }

    putClaimById(add: string, id: string, claimDto: ClaimDto) {
        for (let i = 0; i < this.claims.length; ++i) {
            if (this.claims[i].claimOwner == add && this.claims[i].claimId == id) {
                this.claims[i] = {
                    assetId: claimDto.assetId,
                    assetOwner: claimDto.assetOwner,
                    description: claimDto.description,
                    claimId: this.claims[i].claimId,
                    issueId: this.claims[i].issueId,
                    claimOwner: this.claims[i].claimOwner
                }
                return this.claims[i];
            }
        }
    }

    getTask(add: string): Task[] {
        let x: Task[] = [];
        for (let i = 0; i < this.tasks.length; ++i) {
            if (this.tasks[i].to == add) {
                x.push(this.tasks[i]);
            }
        }
        return x;
    }

    updateTask(add: string, id: string, taskDto: TaskDto): Task {
        let x: Task = undefined;
        for (let i = 0; i < this.tasks.length; ++i) {
            if (this.tasks[i].to == add && this.tasks[i].issueId == id) {
                this.tasks[i] = {
                    description: taskDto.description,
                    to: taskDto.to,
                    from: add,
                    issueId: this.tasks[i].issueId
                }
                x = this.tasks[i];
            }
        }
        return x;
    }
}   
