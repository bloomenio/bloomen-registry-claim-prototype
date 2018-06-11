import {
    Body, Get, JsonController, OnUndefined, Param, Patch, Post, Put, QueryParam
} from 'routing-controllers';

import { ClaimNotFoundError } from '../errors/ClaimNotFoundError';
import { Claim } from '../models/Claim';
import { ClaimResponse } from '../models/ClaimResponse';
import { MultichainService } from '../services/MultichainService';

@JsonController()
export class ClaimController {

    constructor(
        private multichainService: MultichainService
    ) { }

    @Get('/wallet/:address/claim')
    public find(@Param('address') address: string, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number): Promise<Claim[]> {
        return this.multichainService.getClaims(address, limit, offset);
    }

    @Get('/wallet/:address/claim/:id')
    @OnUndefined(ClaimNotFoundError)
    public one(@Param('address') address: string, @Param('id') id: string): Promise<Claim | undefined> {
        return this.multichainService.getClaim(address, id);
    }

    @Post('/wallet/:address/claim')
    public create(@Param('address') address: string, @Body() claim: Claim): Promise<Claim> {
        return this.multichainService.createClaim(address, claim);
    }

    @Put('/wallet/:address/claim/:id')
    @OnUndefined(ClaimNotFoundError)
    public update(@Param('address') address: string, @Param('id') id: string, @Body() claim: Claim): Promise<Claim> {
        return this.multichainService.updateClaim(address, id, claim);
    }

    @Patch('/wallet/:address/claim/:id')
    public responseClaim(@Param('address') address: string, @Param('id') id: string, @Body() claimResponse: ClaimResponse):  Promise<undefined> {
        return this.multichainService.responseClaim(address, id, claimResponse);
    }
}
