import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Web3Service } from 'web3/web3.service';

@Module({
  imports: [],
  controllers: [WalletController],
  providers: [WalletService, Web3Service],
})
export class WalletModule {}
