import { Service } from 'typedi';
import { v4 } from 'uuid';

import { Address } from '../models/Address';
import { Asset } from '../models/Asset';
import { Claim } from '../models/Claim';
import { Task } from '../models/Task';

@Service()
export class MultichainService {

    public static readonly STREAM_SUFIX = '_Streams';
    public static readonly CLAIMS_SUFIX = '_Claims';

    private multichainInstance: any;

    public setInstance(multichainInstance: any): any {  this.multichainInstance = multichainInstance; }

    public getAddress(): Promise<Address[]> {
        const resultPromise = new Promise<Address[]>((resolve, reject) => {
            this.multichainInstance.getAddresses({verbose: false}).then(
                (addresses) => {
                    console.log(addresses);
                    const data: Address[] = [];
                    for (const addr of addresses) {
                        const item = new Address(addr);
                        // TODO: add the rights to the output in order to show if has the properly set up on the user interface
                        data.push(item);
                    }
                    resolve(data);
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
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
                asset.assetId = this.generateAssetId(address, asset);
                asset.assetOwner = address;
                this.multichainInstance.publishFrom({from: address, stream: this.generateAssetsStreamName(address),
                                                key: asset.assetId , data: new Buffer(JSON.stringify(asset)).toString('hex') }).then( () => {
                    resolve(asset);
                }, (err) => {
                   reject(err);
                });
            });
        });
        return resultPromise;
    }

    public updateAsset(address: string, id: string, asset: Asset): Promise<Asset> {
        // TODO: check if the user has permissions to publish a new version of the asset
        const resultPromise = new Promise<Asset>((resolve, reject) => {
            asset.assetId = id;
            asset.assetOwner = address;
            this.multichainInstance.publishFrom({from: address, stream: this.generateAssetsStreamName(address),
                                            key: asset.assetId , data: new Buffer(JSON.stringify(asset)).toString('hex') }).then( () => {
                resolve(asset);
            }, (err) => {
               reject(err);
            });
        });
        return resultPromise;
    }

    public getAllBlockchainAssets(): Promise<Asset[]> {
         // TODO: large collections can be annoying
        const resultPromise = new Promise<Asset[]>((resolve, reject) => {

            this.multichainInstance.listStreams((error, streams) => {
                const promises: Array<Promise<undefined>> = [];
                if ( streams ) {
                    for (const stream of streams) {
                        if (stream.name.endsWith(MultichainService.STREAM_SUFIX)) {
                            promises.push(this.multichainInstance.listStreamKeys({stream: stream.name, verbose: true}).then(
                                    (keys) => {
                                        const assets: Asset[] = [];
                                        for (const key of keys) {
                                            const asset: Asset = JSON.parse(new Buffer(key.last.data, 'hex').toString());
                                            assets.push(asset);
                                        }
                                        return assets;
                                    }));
                        }
                    }
                }

                if (promises.length > 0) {
                    Promise.all(promises).then((promisesData: Asset[][]) => {
                        let assets: Asset[] = [];
                        for (const promiseData of promisesData) {
                            assets = assets.concat(promiseData);
                        }
                        resolve(assets);
                    }, (err) => {
                        reject(err);
                    });
                } else {
                    resolve([]);
                }

            });
        });
       return resultPromise;
    }

    public getClaims(address: string): Promise<Claim[]> {
        // TODO: get my sent claims with the current status ( MyClaims Stream )
        const resultPromise = new Promise<Claim[]>((resolve, reject) => {
            this.multichainInstance.listStreamKeys({stream: this.generateClaimsStreamName(address), verbose: true}).then(
                (keys) => {
                    const claims: Claim[] = [];
                    for (const key of keys) {
                       const claim: Claim = JSON.parse(new Buffer(key.last.data, 'hex').toString());
                       claims.push(claim);
                    }
                    resolve(claims);
                }, (err) => {
                    reject(err);
                });
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
        const resultPromise = new Promise<Claim>((resolve, reject) => {
            claim.claimId = this.generateClaimId(address, claim);
            claim.issueId = this.generateClaimIssueName(address, claim);
            claim.claimOwner = address;
            this.checkAccount(address).then( () => {
                // Issue a token for the concrete claim.
                return this.multichainInstance.issueFrom(
                    {
                        from: claim.claimOwner,
                        to: claim.claimOwner,
                        asset: {
                                name: claim.issueId,
                                open: false,
                                },
                        qty: 1,
                        details: {
                                assetId: claim.assetId,
                                assetOwner: claim.assetOwner,
                                claimOwner: claim.claimOwner,
                                issueId: claim.issueId,
                                },
                    });
            }).then((issuedRef) => {
                // subscribe to the token
                return this.multichainInstance.subscribe(
                    {
                        stream: claim.issueId,
                    });
            })
            .then(() => {
                // Create claim on the stream with the link to the token (ref).
                return this.multichainInstance.publishFrom(
                    {
                        from: address,
                        stream: this.generateClaimsStreamName(address),
                        key: claim.claimId,
                        data: new Buffer(JSON.stringify(claim)).toString('hex'),
                    });
            }).then(() => {
                // send the token to the asset owner.
                const requestAmount = {};
                requestAmount[claim.issueId] = 1;
                const task: Task = new Task();
                task.claimId = claim.claimId;
                task.description = 'Initial claim msg';
                task.issueId = claim.issueId;
                task.claimOwner = claim.claimOwner;
                task.from = address;
                task.to = claim.assetOwner;
                // TODO: not clear that the owner data and reference are correct.
                return this.multichainInstance.sendWithMetadataFrom(
                    {
                        from: task.from,
                        to: task.to,
                        amount: requestAmount,
                        data: new Buffer(JSON.stringify(task)).toString('hex'),
                    });
            }).then( () => {
                resolve(claim);
            }, (err) => {
                reject(err);
            } );
        });
        return resultPromise;
     }

    public updateClaim(address: string, id: string,  claim: Claim): Promise<Claim> {
        // TODO: update the claim stream with my changes because the scanner only operates over the destiny.
        // TODO: check if the user has permissions to publish a new version of the asset
        const resultPromise = new Promise<Claim>((resolve, reject) => {
            claim.claimId = id;
            this.multichainInstance.publishFrom({from: address, stream: this.generateClaimsStreamName(address),
                                            key: claim.claimId , data: new Buffer(JSON.stringify(claim)).toString('hex') }).then( () => {
                resolve(claim);
            }, (err) => {
                reject(err);
            });
        });
        return resultPromise;
     }

    public getTasks(_address: string): Promise<Task[]> {
        // TODO: all pending claims assigned to me ( balance of my wallet )
        const resultPromise = new Promise<Task[]>((resolve, reject) => {

            this.multichainInstance.getAddressBalances({address: _address}).then(
                (balances) => {

                    const promises: Array<Promise<any>> = [];

                    for (const balance of balances) {
                        promises.push(this.multichainInstance.listAssetTransactions({asset: balance.name, count: 1, verbose: true}).then(
                            (transactions) => {
                                    return  this.multichainInstance.getRawTransaction({
                                        txid: transactions[0].txid,
                                    });
                                }).then( (data) => {
                                    return this.multichainInstance.decodeRawTransaction({
                                        hexstring: data,
                                    });
                                }).then( (data) => {
                                    const task: Task = JSON.parse(new Buffer(data.data[0], 'hex').toString());
                                    return task;
                                }));
                   }

                   Promise.all(promises).then((promisesData: Task[][]) => {
                    let tasks: Task[] = [];
                        for (const promiseData of promisesData) {
                            tasks = tasks.concat(promiseData);
                        }
                    resolve(tasks);
                    });

                }
            );

        });
        return resultPromise;
     }

    public updateTask(address: string, issueId: string,  task: Task): Promise<Task> {
        // TODO: send the token with payload in order to resolve the claim.
        // the history of the token transaction are the interactions that has been made in order to solve the claim
        const resultPromise = new Promise<Task>((resolve, reject) => {
            // send the token to the asset owner.
            const requestAmount = {};
            requestAmount[issueId] = 1;
            task.from = address;
            task.issueId = issueId;
           this.multichainInstance.sendWithMetadataFrom(
                {
                    from: task.from,
                    to: task.to,
                    amount: requestAmount,
                    data: new Buffer(JSON.stringify(task)).toString('hex'),
                }).then( () => {
                    resolve(task);
                }, (err) => {
                    reject(err);
                });

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

    private generateClaimIssueName(address: string, claim: Claim): string {
        return address.substring(1, 10) + claim.claimId.substring(3, 16);
    }
}
