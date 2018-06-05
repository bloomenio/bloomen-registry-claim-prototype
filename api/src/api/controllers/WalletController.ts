import { Body, Get, JsonController, Post } from 'routing-controllers';

import { Address } from '../models/Address';
import { MultichainService } from '../services/MultichainService';

@JsonController()
export class WalletController {

    constructor(
        private multichainService: MultichainService
    ) { }

    @Get('/wallet')
    public find(): Promise<Address[]> {
        return this.multichainService.getAddress();
    }

    @Post('/wallet')
    public create( @Body() claim: Address): Promise<Address[]> {
        return this.multichainService.createAddress().then(() => this.find());
    }

}
