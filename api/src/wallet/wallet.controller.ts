import { Get, Post, Controller, Param, Body, Put } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './interfaces/wallet.interface';
import { RegistryDto } from './dto/registry.dto';
import { Registry } from './interfaces/registry.interface';
import { Claim } from './interfaces/claim.interface';
import { ClaimDto } from './dto/claim.dto';
import { Task } from './interfaces/task.interface';
import { TaskDto } from './dto/task.dto';

@Controller('/wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) { }

    @Get()
    async getWallet(): Promise<Wallet[]> {
        return this.walletService.getWallet();
    }

    @Post()
    async postWallet(): Promise<Wallet> {
        return this.walletService.postWallet();
    }

    @Post(':address/registry')
    async postRegistry(@Param('address') add: string, @Body() registryDto: RegistryDto): Promise<Registry> {
        return this.walletService.postRegistry(add, registryDto);
    }

    @Get(':address/registry/:id')
    async getRegistry(@Param('address') add: string, @Param('id') id: string): Promise<Registry> {
        return this.walletService.getRegistry(add, id);
    }

    @Put(':address/registry/:id')
    async updateRegistry(@Param('address') add: string, @Param('id') id: string, @Body() registryDto: RegistryDto): Promise<Registry> {
        return this.walletService.updateRegistry(add, id, registryDto);
    }

    @Get(':address/claim')
    async getClaims(@Param('address') add: string): Promise<Claim[]> {
        return this.walletService.getClaim(add);
    }

    @Post(':address/claim')
    async postClaim(@Param('address') add: string, @Body() claimDto: ClaimDto): Promise<Claim> {
        return this.walletService.postClaim(add, claimDto);
    }

    @Get(':address/claim/:id')
    async getClaimById(@Param('address') add: string, @Param('id') id: string): Promise<Claim> {
        return this.walletService.getClaimById(add, id);
    }

    @Put(':address/claim/:id')
    async updateClaimById(@Param('address') add: string, @Param('id') id: string, @Body() claimDto: ClaimDto) {
        return this.walletService.putClaimById(add, id, claimDto);
    }

    @Get(':address/tasks')
    async getTask(@Param('address') add: string) :Promise<Task[]> {
        return this.walletService.getTask(add); 
    }

    @Put(':address/tasks/:issueId')
    async updateTask(@Param('address') add: string, @Param('issueId') issueId: string, @Body() taskDto: TaskDto) {
        return this.walletService.updateTask(add, issueId, taskDto);
    }

}
