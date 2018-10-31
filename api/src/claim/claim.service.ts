import { Injectable, HttpException } from '@nestjs/common';
import { Claim } from './interfaces/claim.interface';
import { ClaimDto } from './dto/claim.dto';

import * as Web3 from 'web3';
var fs = require('fs');
var Q = require('q');

var web3 = new Web3('ws://localhost:7545');

var walletFile = "../ethereum/build/contracts/Demo2Wallet.json";
var compiledWallet = JSON.parse(fs.readFileSync(walletFile, 'utf8'));
var abiWallet = compiledWallet.abi;

var claimFile = "../ethereum/build/contracts/Demo2Claim.json";
var compiledClaim = JSON.parse(fs.readFileSync(claimFile, 'utf8'));
var abiClaim = compiledClaim.abi;

var addrWallet = '0xc5494d3540ff7d4107b03b4c2f490d267964df1a';
var walletContract = new web3.eth.Contract(abiWallet, addrWallet);
// var initialAddress = '0x235e90B0bB3F4c0875a96456d451a5733fb3C025';
// var accountAddress = "0xE0FeE2336a7c23f75acea2be3917ebc9AC7a1156";

@Injectable()
export class ClaimService {

  getClaim(add: string): Promise<Claim[]> {
    return new Promise<Claim[]>((resolve, reject) => {

      walletContract.methods.getClaimAddress(add).call({ from: add })
        .then(claimAddress => {
          var claimContract = new web3.eth.Contract(abiClaim, claimAddress);
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
      walletContract.methods.getClaimAddress(address).call({ from: address })
        .then(claimAddress => {
          var claimContract = new web3.eth.Contract(abiClaim, claimAddress);
          claimContract.methods.createClaim(claimDto.assetId, claimDto.assetOwner, claimDto.description).send({ from: address, gas: 1000000 })
            .then(() => {
              walletContract.getPastEvents('ClaimCreated', { fromBlock: 0, toBlock: 'latest' })
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

  getClaimById(address: string, id: string): Promise<Claim> {
    return new Promise<Claim>((resolve, reject) => {
      walletContract.methods.getClaimAddress(address).call({ from: address })
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
      walletContract.methods.getClaimAddress(address).call({ from: address })
        .then(claimAddress => {
          var claimContract = new web3.eth.Contract(abiClaim, claimAddress);
          claimContract.methods.updateClaim(id, claimDto.assetId, claimDto.assetOwner, claimDto.description).send({ from: address, gas: 1000000 })
            .then(() => {
              walletContract.getPastEvents('ClaimUpdated', { fromBlock: 0, toBlock: 'latest' })
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