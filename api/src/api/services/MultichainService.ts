import { Service } from 'typedi';
import { v4 } from 'uuid';

import { Address } from '../models/Address';
import { Asset } from '../models/Asset';
import { Claim } from '../models/Claim';
import { ClaimResponse } from '../models/ClaimResponse';

@Service()
export class MultichainService {

    public static readonly STREAM_SUFIX = '_Streams';
    public static readonly CLAIMS_SUFIX = '_Claims';

    private multichainInstance: any;

    public setInstance(multichainInstance: any): any {  this.multichainInstance = multichainInstance; }

    public getAddress(): Promise<Address[]> {
        const resultPromise = new Promise<Address[]>((resolve, reject) => {
            this.multichainInstance.getAddresses((err, addresses) => {
                console.log(addresses);
                const data: Address[] = [];
                for (const addr of addresses) {
                    const item = new Address(addr);
                    data.push(item);
                }
                resolve(data);
            });
        });
        return resultPromise;
    }

    public createAddress(): Promise<Address> {
        const resultPromise = new Promise<Address>((resolve, reject) => {
            this.multichainInstance.getNewAddress((err, addr) => {
                const item = new Address(addr);
                resolve(item);
            });
        });
        return resultPromise;
    }

    public getAsset(address: string, id: string): Promise<Asset> {
        const resultPromise = new Promise<Asset>((resolve, reject) => {
            this.multichainInstance.listStreamKeyItems({stream: this.generateAssetsStreamName(address), key: id, count: 1 }).then(
                (item) => {
                    const asset: Asset = JSON.parse(new Buffer(item[0].data, 'hex').toString());
                    resolve(asset);
                },
                (err) => { reject(err); }
            );
        });
        return resultPromise;
    }

    public createAsset(address: string, asset: Asset): Promise<Asset> {
        const resultPromise = new Promise<Asset>((resolve, reject) => {
            this.checkAccount(address).then( () => {
                asset.id = this.generateAssetId(address, asset);
                this.multichainInstance.publishFrom({from: address, stream: this.generateAssetsStreamName(address),
                                                key: asset.id , data: new Buffer(JSON.stringify(asset)).toString('hex') }).then( () => {
                    resolve(asset);
                }, (err) => {
                   // Error in publish
                   reject(err);
                });
            });
        });
        return resultPromise;
    }

    public updateAsset(address: string, id: string, asset: Asset): Promise<Asset> {
        // TODO: check if the user has permissions to publish a new version of the asset
        const resultPromise = new Promise<Asset>((resolve, reject) => {
            asset.id = id;
            this.multichainInstance.publishFrom({from: address, stream: this.generateAssetsStreamName(address),
                                            key: asset.id , data: new Buffer(JSON.stringify(asset)).toString('hex') }).then( () => {
                resolve(asset);
            }, (err) => {
               // Error in publish
               reject(err);
            });
            resolve(undefined);
        });
        return resultPromise;
    }

    public getAssets(): Promise<Asset[]> {
         // TODO: large collections can be annoying
        const resultPromise = new Promise<Asset[]>((resolve, reject) => {

            this.multichainInstance.listStreams((err, streams) => {

                for (const stream of streams) {
                     if (stream.name.endsWith(MultichainService.STREAM_SUFIX)) {
                         this.multichainInstance.listStreamKeys({stream: stream.name, verbose: true}).then(
                                 (keys) => {
                                     const assets: Asset[] = [];
                                     for (const key of keys) {
                                        const asset: Asset = JSON.parse(new Buffer(key.last.data, 'hex').toString());
                                        assets.push(asset);
                                     }
                                     resolve(assets);
                                 });
                     }
                }
            });
        });
       return resultPromise;
    }

    public getClaims(address: string, limit: number, offset: number): Promise<Claim[]> {
        // TODO: get all pending claims assigned to me ( balance of my wallet )
        // and my sent claims with the current status ( MyClaims Stream )
        const resultPromise = new Promise<Claim[]>((resolve, reject) => {
            resolve(undefined);
        });
        return resultPromise;
     }

    public getClaim(address: string, id: string): Promise<Claim> {
        // TODO: get concrete claim data from the blockchain that is stored on "MyClaims Stream" of the originator
        // NICE TO HAVE: show the status of the claim and the history of the issued token.
        const resultPromise = new Promise<Claim>((resolve, reject) => {
            this.multichainInstance.listStreamKeyItems({stream: this.generateClaimsStreamName(address), key: id, count: 1 }).then(
                (item) => {
                    const claim: Claim = JSON.parse(new Buffer(item[0].data, 'hex').toString());
                    resolve(claim);
                },
                (err) => { reject(err); }
            );
        });
        return resultPromise;
     }

    public createClaim(address: string, claim: Claim): Promise<Claim> {
        // TODO: issue a token for the concrete claim.
        // subscribe to the token
        // If no claim stream exist create one
        // Create claim on the stream with the link to the token (ref).
        // send the token to the asset owner.
        const resultPromise = new Promise<Claim>((resolve, reject) => {
            this.checkAccount(address).then( () => {
                claim.id = this.generateClaimId(address, claim);
                this.multichainInstance.publishFrom({from: address, stream: this.generateClaimsStreamName(address),
                                                key: claim.id , data: new Buffer(JSON.stringify(claim)).toString('hex') }).then( () => {
                    resolve(claim);
                }, (err) => {
                   // Error in publish
                   reject(err);
                });
            });
        });
        return resultPromise;
     }

    public updateClaim(address: string, id: string,  claim: Claim): Promise<Claim> {
        // TODO: Change the state of the claim that I own on "myclaims stream"
        // send the token to a burden address if positive resolve or return to sender if not
        // update the claim stream with my changes because the scanner only operates over the destiny.
        // TODO: check if the user has permissions to publish a new version of the asset
        const resultPromise = new Promise<Claim>((resolve, reject) => {
            claim.id = id;
            this.multichainInstance.publishFrom({from: address, stream: this.generateClaimsStreamName(address),
                                            key: claim.id , data: new Buffer(JSON.stringify(claim)).toString('hex') }).then( () => {
                resolve(claim);
            }, (err) => {
                // Error in publish
                reject(err);
            });
            resolve(undefined);
        });
        return resultPromise;
     }

    public responseClaim(address: string, id: string,  claimResponse: ClaimResponse): Promise<undefined> {
        // TODO: send the token with payload in order to resolve the claim.
        // the history of the token transaction are the interactions that has been made in order to solve the claim
        const resultPromise = new Promise<undefined>((resolve, reject) => {
            resolve(undefined);
        });
        return resultPromise;
     }

    private checkAccount(address: string): Promise<undefined> {
        const resultPromise = new Promise<undefined>((resolve, reject) => {
            // TODO:
            // Check the account in order to create the Asset and Claim streams
            // If the address has not permissions raise a error.

            this.multichainInstance.createFrom({from: address, type: 'stream', name: this.generateAssetsStreamName(address), open: false}).then(
                () => {
                    this.multichainInstance.createFrom({from: address, type: 'stream', name: this.generateClaimsStreamName(address), open: false}).then(
                        () => {
                            resolve(undefined);
                        },
                        (err) => {
                            // reject(err);
                            // allways resolve because is a checked error type
                            resolve(undefined);
                        }
                    );
                },
                (err) => {
                    // reject(err);
                    // allways resolve because is a checked error type
                    resolve(undefined);
                }
            );

        });
        return resultPromise;
    }

    private generateAssetId(address: string, asset: Asset): string {
        return v4();
    }

    private generateClaimId(address: string, claim: Claim): string {
        return v4();
    }

    private generateAssetsStreamName(address: string): string {
        return address.substring(1, 18) + MultichainService.STREAM_SUFIX;
    }

    private generateClaimsStreamName(address: string): string {
        return address.substring(1, 18) + MultichainService.CLAIMS_SUFIX;
    }

}
