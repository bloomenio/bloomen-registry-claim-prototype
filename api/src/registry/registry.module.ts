import { Module } from '@nestjs/common';
import { RegistryController } from './registry.controller';
import { RegistryService } from './registry.service';
import { Web3Service } from 'web3/web3.service';

@Module({
  imports: [],
  controllers: [RegistryController],
  providers: [RegistryService, Web3Service],
})
export class RegistryModule { }
