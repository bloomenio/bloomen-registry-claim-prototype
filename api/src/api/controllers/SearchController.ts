import { Get, JsonController, QueryParam } from 'routing-controllers';

import { Asset } from '../models/Asset';
import { MultichainService } from '../services/MultichainService';

@JsonController('/search')
export class SearchController {

    constructor(
        private multichainService: MultichainService
    ) { }

    @Get()
    public find(@QueryParam('q') q: string): Promise<Asset[]> {
        this.multichainService.sayHello();
        return undefined;
    }

}
