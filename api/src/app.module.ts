import { Module } from '@nestjs/common';
import { WalletController } from 'wallet/wallet.controller';
import { WalletService } from 'wallet/wallet.service';
import { WalletModule } from 'wallet/wallet.module';

@Module({
  imports: [WalletModule]
})
export class AppModule {}
