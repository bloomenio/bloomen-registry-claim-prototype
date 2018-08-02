import { Service } from 'typedi';

import { Asset } from '../models/Asset';

@Service()
export class SolrService {

    private solrClient: any;

    public setInstance(solrClient: any): any {  this.solrClient = solrClient; }

    public getSearch(query: string= '*', limit: number= 50, offset: number= 0): Promise<Asset[]> {
        const resultPromise = new Promise<Asset[]>((resolve, reject) => {
            console.log(query);

            const queryObj = this.solrClient.createQuery()
                                .q( {_text_: query} )
                                .start(offset)
                                .rows(limit);

            this.solrClient.search(queryObj, (err, obj) => {

                if (obj) {
                    const resultData: Asset[] = [];

                    for (const doc of obj.response.docs) {
                        const asset = new Asset();
                        asset.assetId = doc.id;
                        asset.assetOwner = doc.assetOwner_s;
                        asset.name = doc.name_t;
                        asset.author = doc.author_t;
                        asset.description = doc.description_t;
                        resultData.push(asset);
                    }

                    console.log(resultData);
                    resolve(resultData);
                }

            });
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
