import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
const Web3 = require('web3');

var fs = require('fs');

@Injectable()
export class Web3Service {
  private web3: any = new Web3("ws://localhost:7545");
  private abiClaim;
  private abiTask;
  private abiRegistry;
  private walletContract;

  constructor() {
    let walletFile = "../ethereum/build/contracts/Demo2Wallet.json";
    let compiledWallet = JSON.parse(fs.readFileSync(walletFile, 'utf8'));
    this.walletContract = new this.web3.eth.Contract(compiledWallet.abi, compiledWallet.networks[process.env.NETWORK_ID].address);

    let claimFile = "../ethereum/build/contracts/Demo2Claim.json";
    let compiledClaim = JSON.parse(fs.readFileSync(claimFile, 'utf8'));
    this.abiClaim = compiledClaim.abi;

    let taskFile = "../ethereum/build/contracts/Demo2Task.json";
    let compiledTask = JSON.parse(fs.readFileSync(claimFile, 'utf8'));
    this.abiTask = compiledTask.abi;

    let registryFile = "../ethereum/build/contracts/Demo2Registry.json";
    let compiledRegistry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
    this.abiRegistry = compiledRegistry.abi;
  }

  public getAbiClaim() {
    return this.abiClaim;
  }

  public getAbiTask() {
    return this.abiTask;
  }

  public getAbiRegistry() {
    return this.abiRegistry;
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
