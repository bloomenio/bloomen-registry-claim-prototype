import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { scheduleJob } from 'node-schedule';
import { Container } from 'typedi';

import { SolrService } from '../api/services/SolrService';

export const scheduleLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {

        const solrService = Container.get(SolrService);

        scheduleJob('*/10 * * * * *', () => {
            console.log('tic-toc!' + new Date());
            const docs = [];
            for (let i = 0; i <= 10 ; i++ ) {
                const doc = {
                    id : 12345 + i,
                    title_t : 'Title ' + i,
                    description_t : 'Text' + i + 'Alice',
                };
                docs.push(doc);
            }
            solrService.addDocuments(docs);
          });
    }
};
