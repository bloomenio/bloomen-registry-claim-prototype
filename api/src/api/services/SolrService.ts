import { Service } from 'typedi';

import { Asset } from '../models/Asset';

@Service()
export class SolrService {

    private solrClient: any;

    constructor(
    ) {
        console.log('create');
    }

    public setInstance(solrClient: any): any {  this.solrClient = solrClient; }

    public getSearch(query: string= '*', limit: number= 50, offset: number= 0): Promise<Asset[]> {
        const resultPromise = new Promise<Asset[]>((resolve, reject) => {
            console.log(query);
            resolve(undefined);
            const queryObj = this.solrClient.createQuery()
                                .q(query)
                                .start(offset)
                                .rows(limit);

            this.solrClient.search(queryObj, (err, obj) => console.log(err, obj));

        });
        return resultPromise;
    }

    public addDocuments(docs: any= []): void {
        this.solrClient.add(docs, (err, obj ) => {
            if (err) {
               console.log(err);
            } else {
                this.solrClient.commit( (err2, res2) => {
                    if ( err2 ) {
                        console.log(err2);
                    } else {
                        console.log(res2);
                    }
                 });
            }
        });
    }

}
