import { Injectable } from '@nestjs/common';
import { Registry } from '../registry/interfaces/registry.interface';
import { SolrService } from '../solr/solr.service';
import * as solr from 'solr-client';
import { Container } from 'typedi';

@Injectable()
export class SearchService {

    private readonly registries: Registry[] = [];

    public client: any = solr.createClient('localhost', '8983', 'demo-bloomen-registry-claim-m12', '/solr');
    public solrService: SolrService = Container.get(SolrService);

    async search(q: string, limit: number, offset: number): Promise<Registry[]> {

        this.solrService.setInstance(this.client);

        return await this.solrService.getSearch(q, limit, offset);

        // let x: Registry[] = [];
        // let off: number = 0;
        // for (let i = 0; i < this.registries.length; ++i) {
        //     if (x.length == limit)
        //         return x;
        //     else {
        //         if (this.registries[i].name.search(q)) {
        //             ++off;
        //             if (off >= offset) x.push(this.registries[i]);
        //         }
        //         else if (this.registries[i].author.search(q)) {
        //             ++off;
        //             if (off >= offset) x.push(this.registries[i]);
        //         }
        //         else if (this.registries[i].description.search(q)) {
        //             ++off;
        //             if (off >= offset) x.push(this.registries[i]);
        //         }
        //     }
        // }
        // return x;
    }

}   
