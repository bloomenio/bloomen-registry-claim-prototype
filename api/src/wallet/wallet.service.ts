import { Injectable } from '@nestjs/common';
import { Wallet } from './interfaces/wallet.interface';
import { Web3Service } from '../web3/web3.service';

var fs = require('fs');

@Injectable()
export class WalletService {

    public walletContract;

    constructor(private web3Service: Web3Service){
        this.walletContract = this.web3Service.getWalletContract();
    }

    getWallet(): Promise<Wallet[]> {
        return new Promise<Wallet[]>((resolve, reject) => {
            this.walletContract.methods.getAddress().call({ from: process.env.INITIAL_ADDRESS })
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
        return new Promise<Wallet[]>( async (resolve, reject) => {
            let accountAddress = await this.web3Service.getWeb3().eth.personal.newAccount(process.env.PASSWORD);
            await this.web3Service.getWeb3().eth.personal.unlockAccount(accountAddress, process.env.PASSWORD, 600);

            this.walletContract.methods.createAddress(accountAddress).send({ from: accountAddress, gas: 100000000 })
                .then(() => {
                    this.walletContract.methods.getAddress().call({ from: process.env.INITIAL_ADDRESS })
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
