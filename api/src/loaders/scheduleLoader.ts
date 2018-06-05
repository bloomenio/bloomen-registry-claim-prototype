import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { scheduleJob } from 'node-schedule';
import { Container } from 'typedi';

import { MultichainService } from '../api/services/MultichainService';
import { SolrService } from '../api/services/SolrService';
import * as mockData from '../mock-data/data.json';

export const scheduleLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {

        const solrService = Container.get(SolrService);
        const multichainService = Container.get(MultichainService);

        scheduleJob('*/20 * * * * *', () => {
            // TODO: scan every X seconds the blockchain streams.
            // for every document in stream add or update SOLR with the latest data.

            console.log('tic-toc!' + new Date());
            multichainService.getAssets();
            solrService.addDocuments(mockData);
          });
    }
};
