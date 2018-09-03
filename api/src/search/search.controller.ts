import { Get, Post, Controller, Param, Body, Put, Query } from '@nestjs/common';
import { WalletService } from '../wallet/wallet.service';

//Swagger
import { ApiUseTags } from '@nestjs/swagger';
import { Registry } from 'wallet/interfaces/registry.interface';

@Controller('/search')
export class SearchController {
    constructor(private readonly walletService: WalletService) { }

    @ApiUseTags('Search')
    @Get()
    async getWallet(@Query('offset') offset: number, @Query('limit') limit: number, @Query('q') q: string): Promise<Registry[]> {
        return this.walletService.search(q, limit, offset);
    }
}