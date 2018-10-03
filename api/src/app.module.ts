import { Module } from '@nestjs/common';
import { WalletModule } from 'wallet/wallet.module';
import { SearchModule } from 'search/search.module';
import { RegistryModule } from 'registry/registry.module';

@Module({
  imports: [
    WalletModule,
    SearchModule,
    RegistryModule
  ]
})
export class AppModule { }
