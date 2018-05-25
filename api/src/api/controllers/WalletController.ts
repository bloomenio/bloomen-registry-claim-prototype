import { Body, Get, JsonController, Post } from 'routing-controllers';

import { Address } from '../models/Address';
import { MultichainService } from '../services/MultichainService';

@JsonController('/wallet')
export class WalletController {

    constructor(
        private multichainService: MultichainService
    ) { }

    @Get()
    public find(): Promise<Address[]> {
        this.multichainService.sayHello();
        return undefined;
    }

    @Post()
    public create( @Body() claim: Address): Promise<Address> {
        return undefined;
    }

}
