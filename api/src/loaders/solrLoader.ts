import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as solr from 'solr-client';
import { Container } from 'typedi';

import { SolrService } from '../api/services/SolrService';

export const solrLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const client = solr.createClient();
        const solrService = Container.get(SolrService);
        solrService.setInstance(client);
    }
};
