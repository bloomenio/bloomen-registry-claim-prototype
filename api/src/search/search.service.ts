import { Injectable } from '@nestjs/common';
import { Registry } from '../registry/interfaces/registry.interface';
import { SolrService } from '../solr/solr.service';
import * as solr from 'solr-client';
import { Container } from 'typedi';

@Injectable()
export class SearchService {

    public client: any = solr.createClient('localhost', '8983', 'demo-bloomen-registry-claim-m12', '/solr');
    public solrService: SolrService = Container.get(SolrService);

    async search(q: string, limit: number, offset: number): Promise<Registry[]> {

        this.solrService.setInstance(this.client);

        return await this.solrService.getSearch(q, limit, offset);
    
    }

}   
