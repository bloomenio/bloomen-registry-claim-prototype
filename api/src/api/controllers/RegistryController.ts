import { Body, Get, JsonController, OnUndefined, Param, Post, Put } from 'routing-controllers';

import { AssetNotFoundError } from '../errors/AssetNotFoundError';
import { Asset } from '../models/Asset';
import { MultichainService } from '../services/MultichainService';

@JsonController('/registry')
export class RegistryController {

    constructor(
        private multichainService: MultichainService
    ) { }

    @Get('/:id')
    @OnUndefined(AssetNotFoundError)
    public one( @Param('id') id: string): Promise<Asset | undefined> {
        this.multichainService.sayHello();
        return undefined;
    }

    @Post()
    public create( @Body() asset: Asset): Promise<Asset> {
        return undefined;
    }

    @Put('/:id')
    public update( @Param('id') id: string, @Body() asset: Asset): Promise<Asset> {
        return undefined;
    }
}
