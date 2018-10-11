import { Injectable } from '@nestjs/common';
import { RegistryDto } from './dto/registry.dto';
import { Registry } from './interfaces/registry.interface';

import * as Web3 from 'web3';
var fs = require('fs');
var Q = require('q');

var web3 = new Web3('ws://localhost:7545');

var walletFile = "../ethereum/build/contracts/Demo2Wallet.json";
var compiledWallet = JSON.parse(fs.readFileSync(walletFile, 'utf8'));
var abiWallet = compiledWallet.abi;

var registryFile = "../ethereum/build/contracts/Demo2Registry.json";
var compiledRegistry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
var abiRegistry = compiledRegistry.abi;

var addrWallet = '0xc5494d3540ff7d4107b03b4c2f490d267964df1a';
var walletContract = new web3.eth.Contract(abiWallet, addrWallet);
var initialAddress = '0x235e90B0bB3F4c0875a96456d451a5733fb3C025';
// var accountAddress = "0xE0FeE2336a7c23f75acea2be3917ebc9AC7a1156";

@Injectable()
export class RegistryService {

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
