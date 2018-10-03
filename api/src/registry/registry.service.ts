import { Injectable, HttpCode, HttpException } from '@nestjs/common';
import { RegistryDto } from './dto/registry.dto';
import { Registry } from './interfaces/registry.interface';

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
                "name": "assetOwner",
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
                "name": "assetOwner",
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
var walletContract = new web3.eth.Contract(abiWallet, addrWallet);
var initialAddress = '0x235e90B0bB3F4c0875a96456d451a5733fb3C025';
// var accountAddress = "0xE0FeE2336a7c23f75acea2be3917ebc9AC7a1156";

@Injectable()
export class RegistryService {

    private readonly registries: Registry[] = [];

    postRegistry(address: string, registryDto: RegistryDto): Promise<Registry> {
        return new Promise<Registry>((resolve, reject) => {
            walletContract.methods.getRegistryAddress(address).call({ from: initialAddress })
                .then(registryAddress => {
                    var registryContract = new web3.eth.Contract(abiRegistry, registryAddress);
                    registryContract.methods.createAsset(registryDto.name, registryDto.author, registryDto.description).send({ from: address, gas: 1000000 })
                        .then(() => {
                            registryContract.getPastEvents('AssetCreated', { fromBlock: 0, toBlock: 'latest' })
                                .then(events => {
                                    let asset = events[events.length - 1].returnValues;
                                    let registry: Registry = {
                                        assetId: asset.assetId,
                                        assetOwner: asset.assetOwner,
                                        name: asset.name,
                                        author: asset.author,
                                        description: asset.description
                                    };
                                    resolve(registry);
                                }, reject);
                        }, reject);
                }, reject);
        });
    }

    getRegistry(address: string, id: string): Promise<Registry> {
        return new Promise<Registry>((resolve, reject) => {
            walletContract.methods.getRegistryAddress(address).call({ from: initialAddress })
                .then(registryAddress => {
                    var registryContract = new web3.eth.Contract(abiRegistry, registryAddress);
                    registryContract.methods.assets(id).call({ from: address })
                        .then(asset => {
                            let registry: Registry = {
                                assetId: asset.assetId,
                                assetOwner: asset.assetOwner,
                                name: asset.name,
                                author: asset.author,
                                description: asset.description
                            };
                            resolve(registry);
                        }, reject);
                }, reject);
        });
    }

    updateRegistry(address: string, id: string, registryDto: RegistryDto): Promise<Registry> {
        return new Promise<Registry>((resolve, reject) => {
            walletContract.methods.getRegistryAddress(address).call({ from: initialAddress })
                .then(registryAddress => {
                    var registryContract = new web3.eth.Contract(abiRegistry, registryAddress);
                    registryContract.methods.updateAsset(id, registryDto.name, registryDto.author, registryDto.description).send({ from: address, gas: 1000000 })
                        .then(() => {
                            registryContract.getPastEvents('AssetUpdated', { fromBlock: 0, toBlock: 'latest' })
                                .then(events => {
                                    let asset = events[events.length - 1].returnValues;
                                    let registry: Registry = {
                                        assetId: asset.assetId,
                                        assetOwner: asset.assetOwner,
                                        name: asset.name,
                                        author: asset.author,
                                        description: asset.description
                                    };
                                    resolve(registry);
                                }, reject);
                        }, reject);
                }, reject);
        });
    }

}   
