import { Body, Get, JsonController, OnUndefined, Param, Post, Put } from 'routing-controllers';

import { ClaimNotFoundError } from '../errors/ClaimNotFoundError';
import { Claim } from '../models/Claim';
import { MultichainService } from '../services/MultichainService';

@JsonController('/claim')
export class ClaimController {

    constructor(
        private multichainService: MultichainService
    ) { }

    @Get()
    public find(): Promise<Claim[]> {
        this.multichainService.sayHello();
        return undefined;
    }

    @Get('/:id')
    @OnUndefined(ClaimNotFoundError)
    public one( @Param('id') id: string): Promise<Claim | undefined> {
        return undefined;
    }

    @Post()
    public create( @Body() claim: Claim): Promise<Claim> {
        return undefined;
    }

    @Put('/:id')
    public update( @Param('id') id: string, @Body() claim: Claim): Promise<Claim> {
        return undefined;
    }
}
