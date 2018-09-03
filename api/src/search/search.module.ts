import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { WalletService } from '../wallet/wallet.service';

@Module({
  imports: [],
  controllers: [SearchController],
  providers: [WalletService],
})
export class SearchModule {}
