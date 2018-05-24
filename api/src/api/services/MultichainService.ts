import { Service } from 'typedi';

@Service()
export class MultichainService {

    private multichainInstance: any;

    constructor(
    ) {
        console.log('create');
    }

     public setInstance(multichainInstance: any): any {  this.multichainInstance = multichainInstance; }

     public sayHello(): void {
        this.multichainInstance.getAddresses((err, addresses) => {
            console.log(addresses);
            try {
                this.multichainInstance.issue(
                    {address: addresses[0], asset: {name: 'koko8', open: true}, qty: 50000, units: 0.01, details: {hello: 'world'}},
                     (err2, res) => {
                         console.log(res);
                     });
            } catch (error) {
                console.log(error);
            }

        });

        console.log('hello');
    }

     public sayHello2(): void { console.log(this.multichainInstance); }

}
