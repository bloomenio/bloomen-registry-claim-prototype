import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { scheduleJob } from 'node-schedule';
import { Container } from 'typedi';

import { SolrService } from '../api/services/SolrService';
import * as mockData from '../mock-data/data.json';

export const scheduleLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {

        const solrService = Container.get(SolrService);

        scheduleJob('*/10 * * * * *', () => {
            console.log('tic-toc!' + new Date());
            solrService.addDocuments(mockData);
          });
    }
};
