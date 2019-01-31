import { Injectable, HttpException } from '@nestjs/common';
import { Claim } from './interfaces/claim.interface';
import { ClaimDto } from './dto/claim.dto';
import { Web3Service } from 'web3/web3.service';

var fs = require('fs');
var Q = require('q');

@Injectable()
export class ClaimService {

  public walletContract;

  constructor(private web3Service: Web3Service) {
    this.walletContract = this.web3Service.getWalletContract();//createContract(abiWallet, compiledWallet.networks[process.env.NETWORK_ID].address);
  }

  getClaim(add: string): Promise<Claim[]> {
    return new Promise<Claim[]>((resolve, reject) => {

      this.walletContract.methods.getClaimAddress(add).call({ from: add })
        .then(claimAddress => {
          var claimContract = this.web3Service.createContract(this.web3Service.getAbiClaim(), claimAddress);
          claimContract.methods.claimsNumber().call({ from: add })
            .then(claimsNumber => {
              let claimsArray: Claim[] = [];
              let claimPromises: Promise<any>[] = [];
              var i;
              for (i = 1; i <= claimsNumber; i++) {
                claimPromises.push(claimContract.methods.claims(i).call({ from: add }));
              }
              Q.all(claimPromises).then(claims => {
                for (let asset of claims) {
                  let claim: Claim = {
                    assetId: asset.assetId,
                    assetOwner: asset.assetOwner,
                    claimId: asset.claimId,
                    claimOwner: asset.claimOwner,
                    description: asset.description
                  };
                  claimsArray.push(claim);
                }
                resolve(claimsArray);
              }, reject);
            }, reject);
        }, reject);
    });
  }

  postClaim(address: string, claimDto: ClaimDto): Promise<Claim> {
    return new Promise<Claim>((resolve, reject) => {
      this.walletContract.methods.getClaimAddress(address).call({ from: address })
        .then(claimAddress => {

          const claimContract = this.web3Service.createContract(this.web3Service.getAbiClaim(), claimAddress);
          this.web3Service.getWeb3().eth.personal.unlockAccount(address, process.env.PASSWORD, 600).then(() => {
            claimContract.methods.createClaim(claimDto.assetId, claimDto.assetOwner, claimDto.description).send({ from: address, gas: 672197500 })
            .then(() => {
              this.walletContract.getPastEvents('ClaimCreated', { fromBlock: 0, toBlock: 'latest' })
                .then(events => {
                  const asset = events[events.length - 1].returnValues;
                  const claim: Claim = {
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
        }, reject);
    });
  }

  getClaimById(address: string, id: string): Promise<Claim> {
    return new Promise<Claim>((resolve, reject) => {
      this.walletContract.methods.getClaimAddress(address).call({ from: address })
        .then(claimAddress => {
          var claimContract = this.web3Service.createContract(this.web3Service.getAbiClaim(), claimAddress);
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
     this.walletContract.methods.getClaimAddress(address).call({ from: address })
        .then(claimAddress => {
          var claimContract = this.web3Service.createContract(this.web3Service.getAbiClaim(), claimAddress);
          claimContract.methods.updateClaim(id, claimDto.assetId, claimDto.assetOwner, claimDto.description).send({ from: address, gas: 1000000 })
            .then(() => {
              this.walletContract.getPastEvents('ClaimUpdated', { fromBlock: 0, toBlock: 'latest' })
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