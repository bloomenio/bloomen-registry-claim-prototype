import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as solr from 'solr-client';
import { Container } from 'typedi';

import { SolrService } from '../api/services/SolrService';
import { env } from '../env';

export const solrLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const client = solr.createClient(env.solr.host, env.solr.port, env.solr.core, env.solr.path);
        const solrService = Container.get(SolrService);
        solrService.setInstance(client);
    }
};
