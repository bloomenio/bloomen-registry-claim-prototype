import { Body, Get, JsonController, OnUndefined, Param, Post, Put } from 'routing-controllers';

import { AssetNotFoundError } from '../errors/AssetNotFoundError';
import { Asset } from '../models/Asset';
import { MultichainService } from '../services/MultichainService';

@JsonController()
export class RegistryController {

    constructor(
        private multichainService: MultichainService
    ) { }

    @Get('/wallet/:address/registry/:id')
    @OnUndefined(AssetNotFoundError)
    public one(@Param('address') address: string, @Param('id') id: string): Promise<Asset | undefined> {
        return this.multichainService.getAsset(address, id);
    }

    @Post('/wallet/:address/registry/')
    public create(@Param('address') address: string, @Body() asset: Asset): Promise<Asset> {
        return this.multichainService.createAsset(address, asset);
    }

    @Put('/wallet/:address/registry/:id')
    public update(@Param('address') address: string, @Param('id') id: string, @Body() asset: Asset): Promise<Asset> {
        return this.multichainService.updateAsset(address, id, asset);
    }
}
