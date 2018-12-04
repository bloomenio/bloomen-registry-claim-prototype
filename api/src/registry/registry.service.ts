import { Injectable } from '@nestjs/common';
import { RegistryDto } from './dto/registry.dto';
import { Registry } from './interfaces/registry.interface';
import { Web3Service } from '../web3/web3.service';

var fs = require('fs');
var Q = require('q');

@Injectable()
export class RegistryService {

    public walletContract;

    constructor(private web3Service: Web3Service) {
        this.walletContract = this.web3Service.getWalletContract();
    }

    postRegistry(address: string, registryDto: RegistryDto): Promise<Registry> {
        return new Promise<Registry>((resolve, reject) => {
            this.walletContract.methods.getRegistryAddress(address).call({ from: address })
                .then(registryAddress => {
                    var registryContract = this.web3Service.createContract(this.web3Service.getAbiRegistry(), registryAddress);
                    registryContract.methods.createAsset(registryDto.name, registryDto.author, registryDto.description).send({ from: address, gas: 1000000 })
                        .then(() => {
                            this.walletContract.getPastEvents('AssetCreated', { fromBlock: 0, toBlock: 'latest' })
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
            this.walletContract.methods.getRegistryAddress(address).call({ from: address })
                .then(registryAddress => {
                    var registryContract = this.web3Service.createContract(this.web3Service.getAbiRegistry(), registryAddress);
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
            this.walletContract.methods.getRegistryAddress(address).call({ from: address })
                .then(registryAddress => {
                    var registryContract = this.web3Service.createContract(this.web3Service.getAbiRegistry(), registryAddress);
                    registryContract.methods.updateAsset(id, registryDto.name, registryDto.author, registryDto.description).send({ from: address, gas: 1000000 })
                        .then(() => {
                            this.walletContract.getPastEvents('AssetUpdated', { fromBlock: 0, toBlock: 'latest' })
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
