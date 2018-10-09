import { Get, Post, Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './interfaces/wallet.interface';

//Swagger
import { ApiUseTags } from '@nestjs/swagger';

@Controller('/wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) { }

    @ApiUseTags('Wallet')
    @Get()
    async getWallet(): Promise<Wallet[]> {
        return this.walletService.getWallet();
    }

    @ApiUseTags('Wallet')
    @Post()
    async postWallet(): Promise<Wallet[]> {
        return this.walletService.postWallet();
    }

}
