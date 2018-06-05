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
        // TODO: get all pending claims assigned to me ( balance of my wallet )
        // and my sent claims with the current status ( MyClaims Stream )
        return this.multichainService.getClaims(address, limit, offset);
    }

    @Get('/wallet/:address/claim/:id')
    @OnUndefined(ClaimNotFoundError)
    public one(@Param('address') address: string, @Param('id') id: string): Promise<Claim | undefined> {
        // TODO: get concrete claim data from the blockchain that is stored on "MyClaims Stream" of the originator
        // show the status of the claim and the history of the issued token.
        return undefined;
    }

    @Post('/wallet/:address/claim')
    public create(@Param('address') address: string, @Body() claim: Claim): Promise<Claim> {
        // TODO: issue a token for the concrete claim.
        // subscribe to the token
        // If no claim stream exist create one
        // Create claim on the stream with the link to the token (ref).
        // send the token to the asset owner.
        return undefined;
    }

    @Put('/wallet/:address/claim/:id')
    public update(@Param('address') address: string, @Param('id') id: string, @Body() claim: Claim): Promise<Claim> {
        // TODO: Change the state of the claim that I own on "myclaims stream"
        // send the token to a burden address if positive resolve or return to sender if not
        // update the claim stream with my changes because the scanner only operates over the destiny.
        return undefined;
    }

    @Patch('/wallet/:address/claim/:id')
    public responseClaim(@Param('address') address: string, @Param('id') id: string, @Body() claimResponse: ClaimResponse): undefined {
        // TODO: send the token with payload in order to resolve the claim.
        // the history of the token transaction are the interactions that has been made in order to solve the claim
        return undefined;
    }
}
