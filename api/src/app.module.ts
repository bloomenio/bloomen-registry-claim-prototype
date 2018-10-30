import { Module } from '@nestjs/common';
import { WalletModule } from 'wallet/wallet.module';
import { SearchModule } from 'search/search.module';
import { RegistryModule } from 'registry/registry.module';
import { ClaimModule } from 'claim/claim.module';
import { ScheduleModule } from 'nest-schedule/schedule.module';
import { TaskModule } from 'task/task.module';
import { SolrModule } from 'solr/solr.module';

@Module({
  imports: [
    WalletModule,
    SearchModule,
    RegistryModule,
    ClaimModule, 
    ScheduleModule,
    TaskModule,
    SolrModule
  ]
})
export class AppModule { }
