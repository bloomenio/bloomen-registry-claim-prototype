import { Injectable, HttpException } from '@nestjs/common';
import { Claim } from './interfaces/claim.interface';
import { ClaimDto } from './dto/claim.dto';

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
var abiClaim = [
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
        "name": "claims",
        "outputs": [
            {
                "name": "assetId",
                "type": "uint256"
            },
            {
                "name": "assetOwner",
                "type": "address"
            },
            {
                "name": "description",
                "type": "string"
            },
            {
                "name": "claimId",
                "type": "uint256"
            },
            {
                "name": "claimOwner",
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
                "name": "_assetId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_assetOwner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_description",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "_claimId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_claimOwner",
                "type": "address"
            }
        ],
        "name": "ClaimCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "_assetId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_assetOwner",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_description",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "_claimId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "_claimOwner",
                "type": "address"
            }
        ],
        "name": "ClaimUpdated",
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
                "name": "_assetId",
                "type": "uint256"
            },
            {
                "name": "_assetOwner",
                "type": "address"
            },
            {
                "name": "_description",
                "type": "string"
            }
        ],
        "name": "createClaim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_claimId",
                "type": "uint256"
            },
            {
                "name": "_assetId",
                "type": "uint256"
            },
            {
                "name": "_assetOwner",
                "type": "address"
            },
            {
                "name": "_description",
                "type": "string"
            }
        ],
        "name": "updateClaim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

var addrWallet = '0xc5494d3540ff7d4107b03b4c2f490d267964df1a';
var walletContract = new web3.eth.Contract(abiWallet, addrWallet);
var initialAddress = '0x235e90B0bB3F4c0875a96456d451a5733fb3C025';
// var accountAddress = "0xE0FeE2336a7c23f75acea2be3917ebc9AC7a1156";

@Injectable()
export class ClaimService {

    private readonly claims: Claim[] = [];

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
                claimOwner: add
            }
            this.claims.push(x);
            // this.tasks.push({
            //     description: "Initial claim msg",
            //     to: x.assetOwner,
            //     from: x.claimOwner,
            //     issueId: x.issueId
            // });
            return x;
        }
        else {
            throw HttpException;
        }
    }

    getClaimById(address: string, id: string): Promise<Claim> {
        return new Promise<Claim>((resolve, reject) => {
            walletContract.methods.getClaimAddress(address).call({ from: initialAddress })
                .then(claimAddress => {
                    var claimContract = new web3.eth.Contract(abiClaim, claimAddress);
                    claimContract.methods.claims(id).call({ from: address })
                        .then(asset => {
                            let claim: Claim = {
                                assetId: asset.assetId,
                                assetOwner: asset.assetOwner,
                                claimId: asset.claimId,
                                claimOwner: asset.claimOwner,
                                description: asset.description
                            };
                            resolve(claim);
                        }, reject);
                }, reject);
        });
    }

    putClaimById(address: string, id: string, claimDto: ClaimDto): Promise<Claim> {
        return new Promise<Claim>((resolve, reject) => {
            walletContract.methods.getClaimAddress(address).call({ from: initialAddress })
                .then(claimAddress => {
                    var claimContract = new web3.eth.Contract(abiClaim, claimAddress);
                    claimContract.methods.updateClaim(id, claimDto.assetId, claimDto.assetOwner, claimDto.description).send({ from: address, gas: 1000000 })
                        .then(() => {
                            claimContract.getPastEvents('ClaimUpdated', { fromBlock: 0, toBlock: 'latest' })
                                .then(events => {
                                    let asset = events[events.length - 1].returnValues;
                                    let claim: Claim = {
                                        assetId: asset.assetId,
                                        assetOwner: asset.assetOwner,
                                        claimId: asset.claimId,
                                        claimOwner: asset.claimOwner,
                                        description: asset.description
                                    };
                                    resolve(claim);
                                }, reject);
                        }, reject);
                }, reject);
        });
    }

}