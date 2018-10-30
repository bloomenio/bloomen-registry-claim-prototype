import { Service } from 'typedi';

import { Registry } from '../registry/interfaces/registry.interface';

@Service()
export class SolrService {

    private solrClient: any;

    public setInstance(solrClient: any): any { this.solrClient = solrClient; }

    public getSearch(query: string = '*', limit: number = 50, offset: number = 0): Promise<Registry[]> {
        const resultPromise = new Promise<Registry[]>((resolve, reject) => {
            console.log(query);

            const queryObj = this.solrClient.createQuery()
                .q({ _text_: query })
                .start(offset)
                .rows(limit);

            this.solrClient.search(queryObj, (err, obj) => {

                if (obj) {
                    const resultData: Registry[] = [];

                    for (const doc of obj.response.docs) {
                        const asset: Registry = {
                            assetId: doc.id,
                            assetOwner: doc.assetOwner_s,
                            name: doc.name_t,
                            author: doc.author_t,
                            description: doc.description_t
                        };
                        resultData.push(asset);
                    }

                    console.log(resultData);
                    resolve(resultData);
                }

            });
        });
        return resultPromise;
    }

    public addDocuments(docs: any = []): void {
        this.solrClient.add(docs, (err, obj) => {
            if (err) {
                console.log(err);
            } else {
                this.solrClient.commit((err2, res2) => {
                    if (err2) {
                        console.log(err2);
                    } else {
                        console.log(res2);
                    }
                });
            }
        });
    }

}