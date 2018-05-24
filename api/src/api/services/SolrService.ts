import { Service } from 'typedi';

@Service()
export class SolrService {

    private solrClient: any;

    constructor(
    ) {
        console.log('create');
    }

     public setInstance(solrClient: any): any {  this.solrClient = solrClient; }

     public sayHello(): void {
        console.log('hello' + this.solrClient);
    }
}
