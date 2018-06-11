import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { scheduleJob } from 'node-schedule';
import { Container } from 'typedi';

import { MultichainService } from '../api/services/MultichainService';
import { SolrService } from '../api/services/SolrService';

export const scheduleLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {

        const solrService = Container.get(SolrService);
        const multichainService = Container.get(MultichainService);

        scheduleJob('*/20 * * * * *', () => {
            // TODO: scan every X seconds the blockchain streams.
            // for every document in stream add or update SOLR with the latest data.
            // Is needed to make changes in order to allow the indexation of large collections.

            console.log('tic-toc!' + new Date());
             multichainService.getAssets().then( (assets) => {
                const assetSolrList = [];

                for (const asset of assets) {
                    const assetSolr = {
                        id: asset.id,
                        name_t: asset.name,
                        author_t: asset.author,
                        description_t: asset.description,
                        date_dt: asset.date,
                    };
                    assetSolrList.push(assetSolr);
                }
                solrService.addDocuments(assetSolrList);
             });
          });
    }
};
