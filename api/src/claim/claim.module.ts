import { Module } from '@nestjs/common';
import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';
import { Web3Service } from 'web3/web3.service';

@Module({
    imports: [],
    controllers: [ClaimController],
    providers: [ClaimService, Web3Service],
})
export class ClaimModule { }
