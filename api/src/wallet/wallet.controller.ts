import { Get, Post, Controller, Param, Body, Put } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './interfaces/wallet.interface';
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

    @ApiUseTags('Tasks')
    @Get(':address/tasks')
    async getTask(@Param('address') add: string): Promise<Task[]> {
        return this.walletService.getTask(add);
    }

    @ApiUseTags('Tasks')
    @Put(':address/tasks/:issueId')
    async updateTask(@Body() taskDto: TaskDto, @Param('issueId') issueId: string, @Param('address') add: string) {
        return this.walletService.updateTask(add, issueId, taskDto);
    }

}
