import { Get, Controller, Query } from '@nestjs/common';
import { SearchService } from './search.service';

//Swagger
import { ApiUseTags } from '@nestjs/swagger';
import { Registry } from '../registry/interfaces/registry.interface';

@Controller('/search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @ApiUseTags('Search')
    @Get()
    async getWallet(@Query('offset') offset: number, @Query('limit') limit: number, @Query('q') q: string): Promise<Registry[]> {
        return this.searchService.search(q, limit, offset);
    }
}