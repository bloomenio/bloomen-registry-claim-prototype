import { Service } from 'typedi';

import { Address } from '../models/Address';

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

}
