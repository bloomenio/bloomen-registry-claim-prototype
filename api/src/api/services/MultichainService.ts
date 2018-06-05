import { Service } from 'typedi';

import { Address } from '../models/Address';
import { Asset } from '../models/Asset';
import { Claim } from '../models/Claim';

@Service()
export class MultichainService {

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
            resolve(undefined);
        });
        return resultPromise;
    }

    public createAsset(asset: Asset): Promise<Asset> {
        const resultPromise = new Promise<Asset>((resolve, reject) => {
            this.checkAccount().then( () => {
                this.multichainInstance.publish({stream: 'koko3', key: 'key', data: new Buffer('some stream data2').toString('hex') }).then( () => {
                    resolve(undefined);
                }, (err) => {
                    console.log(err);
                });
            });
        });
        return resultPromise;
    }

    public updateAsset(asset: Asset): Promise<Asset> {

        return undefined;
    }

    public getAssets(): Promise<Asset[]> {
       this.multichainInstance.listStreams((err, streams) => {
           console.log(streams);
           for (const stream of streams) {
                this.multichainInstance.listStreamKeys({stream: stream.name, verbose: true}).then(
                        (keys) => {
                            for (const key of keys) {
                                this.multichainInstance.listStreamKeyItems(
                                    {
                                        stream: stream.name,
                                        key: key.key,
                                        verbose: false,
                                        count: 1,
                                    }).then(
                                    (values) => {

                                        console.log(new Buffer(values[0].data, 'hex').toString());
                                    }
                                );
                            }
                        });
           }
       });

       return undefined;
    }

    public getClaims(address: string, limit: number, offset: number): Promise<Claim[]> {
        const resultPromise = new Promise<Claim[]>((resolve, reject) => {
            resolve(undefined);
        });
        return resultPromise;
     }

    private checkAccount(): Promise<undefined> {
        const resultPromise = new Promise<undefined>((resolve, reject) => {
            // TODO: sss
            // Check the account in order to create the Asset and Claim streams
            // If the address has not permissions raise a error.

            resolve(undefined);
        });
        return resultPromise;
    }

}
