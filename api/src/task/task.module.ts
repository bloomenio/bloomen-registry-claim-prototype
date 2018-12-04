import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Web3Service } from 'web3/web3.service';

@Module({
    imports: [],
    controllers: [TaskController],
    providers: [TaskService, Web3Service],
})
export class TaskModule { }
