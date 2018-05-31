import { Get, JsonController, QueryParam } from 'routing-controllers';

import { Asset } from '../models/Asset';
import { SolrService } from '../services/SolrService';

@JsonController('/search')
export class SearchController {

    constructor(
        private solrService: SolrService
    ) { }

    @Get()
    public find(@QueryParam('q') q: string, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number): Promise<Asset[]> {
        return this.solrService.getSearch(q, limit, offset);
    }

}
