import { Get, Post, Controller, Param, Body, Put } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './interfaces/wallet.interface';
import { RegistryDto } from './dto/registry.dto';
import { Registry } from './interfaces/registry.interface';
import { Claim } from './interfaces/claim.interface';
import { ClaimDto } from './dto/claim.dto';
import { Task } from './interfaces/task.interface';
import { TaskDto } from './dto/task.dto';

//Swagger
import { ApiUseTags } from '@nestjs/swagger';

@Controller('/wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) { }

    @ApiUseTags('Wallet')
    @Get()
    async getWallet(): Promise<Wallet[]> {
        return this.walletService.getWallet();
    }

    @ApiUseTags('Wallet')
    @Post()
    async postWallet(): Promise<Wallet[]> {
        return this.walletService.postWallet();
    }

    @ApiUseTags('Registry')
    @Post(':address/registry')
    async postRegistry(@Body() registryDto: RegistryDto, @Param('address') add: string): Promise<Registry> {
        return this.walletService.postRegistry(add, registryDto);
    }

    @ApiUseTags('Registry')
    @Get(':address/registry/:id')
    async getRegistry(@Param('address') add: string, @Param('id') id: string): Promise<Registry> {
        return this.walletService.getRegistry(add, id);
    }

    @ApiUseTags('Registry')
    @Put(':address/registry/:id')
    async updateRegistry(@Body() registryDto: RegistryDto, @Param('address') add: string, @Param('id') id: string): Promise<Registry> {
        return this.walletService.updateRegistry(add, id, registryDto);
    }

    @ApiUseTags('Claim')
    @Get(':address/claim')
    async getClaims(@Param('address') add: string): Promise<Claim[]> {
        return this.walletService.getClaim(add);
    }

    @ApiUseTags('Claim')
    @Post(':address/claim')
    async postClaim(@Body() claimDto: ClaimDto, @Param('address') add: string): Promise<Claim> {
        return this.walletService.postClaim(add, claimDto);
    }

    @ApiUseTags('Claim')
    @Get(':address/claim/:id')
    async getClaimById(@Param('address') add: string, @Param('id') id: string): Promise<Claim> {
        return this.walletService.getClaimById(add, id);
    }

    @ApiUseTags('Claim')
    @Put(':address/claim/:id')
    async updateClaimById(@Body() claimDto: ClaimDto, @Param('address') add: string, @Param('id') id: string) {
        return this.walletService.putClaimById(add, id, claimDto);
    }

    @ApiUseTags('Tasks')
    @Get(':address/tasks')
    async getTask(@Param('address') add: string) :Promise<Task[]> {
        return this.walletService.getTask(add); 
    }

    @ApiUseTags('Tasks')
    @Put(':address/tasks/:issueId')
    async updateTask(@Body() taskDto: TaskDto, @Param('issueId') issueId: string, @Param('address') add: string) {
        return this.walletService.updateTask(add, issueId, taskDto);
    }

}
