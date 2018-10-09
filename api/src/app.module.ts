import { Module } from '@nestjs/common';
import { WalletModule } from 'wallet/wallet.module';
import { SearchModule } from 'search/search.module';
import { RegistryModule } from 'registry/registry.module';
import { ClaimModule } from 'claim/claim.module';
import { ScheduleService } from 'nest-schedule/schedule.service';
import { ScheduleModule } from 'nest-schedule/schedule.module';

@Module({
  imports: [
    WalletModule,
    SearchModule,
    RegistryModule,
    ClaimModule, 
    ScheduleModule
  ]
})
export class AppModule { }
