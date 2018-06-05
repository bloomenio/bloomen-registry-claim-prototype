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
        // TODO: get the last data of an asset from de Blockchain
        // the id is a URN (internal ref?¿?) format string that allows identification the stream and the asset in it.
        return this.multichainService.getAsset(address, id);
    }

    @Post('/wallet/:address/registry/')
    public create(@Param('address') address: string, @Body() asset: Asset): Promise<Asset> {
        // TODO: create an address stream if not exist and upload the new asset
        // if the asset exit is mandatory throw an error.
        // this method returns the stored asset with the assigned id in URN format that allows to find it on the blockchain
        return this.multichainService.createAsset(asset);
    }

    @Put('/wallet/:address/registry/:id')
    public update(@Param('address') address: string, @Param('id') id: string, @Body() asset: Asset): Promise<Asset> {
        // TODO: Update the asset on the stream if exist and throw an error if not.
        return this.multichainService.updateAsset(asset);
    }
}
