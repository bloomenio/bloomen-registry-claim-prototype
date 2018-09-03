import { Module } from '@nestjs/common';
import { WalletController } from 'wallet/wallet.controller';
import { WalletService } from 'wallet/wallet.service';
import { WalletModule } from 'wallet/wallet.module';
import { SearchModule } from 'search/search.module';

@Module({
  imports: [WalletModule, SearchModule]
})
export class AppModule {}
