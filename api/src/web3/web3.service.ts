import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
const Web3 = require('web3');

var fs = require('fs');

@Injectable()
export class Web3Service {
  private web3: any = new Web3("ws://localhost:7545");
  private walletFile;
  private compiledWallet;
  private claimFile;
  private taskFile;
  private registryFile;
  private walletContract;

  constructor() {
    this.walletFile = "../ethereum/build/contracts/Demo2Wallet.json";
    this.compiledWallet = JSON.parse(fs.readFileSync(this.walletFile, 'utf8'));
    this.claimFile = "../ethereum/build/contracts/Demo2Claim.json";
    this.taskFile = "../ethereum/build/contracts/Demo2Task.json";
    this.registryFile = "../ethereum/build/contracts/Demo2Registry.json";
    this.walletContract = new this.web3.eth.Contract(this.compiledWallet.abi, this.compiledWallet.networks[process.env.NETWORK_ID].address);
  }

  public getWalletFile() {
    return this.walletFile;
  }

  public getClaimFile() {
    return this.claimFile;
  }

  public getTaskFile() {
    return this.taskFile;
  }

  public getRegistryFile() {
    return this.registryFile;
  }

  public getWalletContract() {
    return this.walletContract;
  }

  public createContract(abi: any, address: string) {
    return new this.web3.eth.Contract(abi, address);
  }

  public checkTransactionStatus(txhash: string): Promise<any> {
    return this.web3.eth.getTransactionReceipt(txhash);
  }

  public getWeb3() {
    return this.web3;
  }

}