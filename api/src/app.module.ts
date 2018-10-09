import { Module } from '@nestjs/common';
import { WalletModule } from 'wallet/wallet.module';
import { SearchModule } from 'search/search.module';
import { RegistryModule } from 'registry/registry.module';
import { ClaimModule } from 'claim/claim.module';
import { TaskModule } from 'task/task.module';

@Module({
  imports: [
    WalletModule,
    SearchModule,
    RegistryModule,
    ClaimModule,
    TaskModule
  ]
})
export class AppModule { }
