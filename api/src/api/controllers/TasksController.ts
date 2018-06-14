import { Body, Get, JsonController, OnUndefined, Param, Put } from 'routing-controllers';

import { TaskNotFoundError } from '../errors/TaskNotFoundError';
import { Task } from '../models/Task';
import { MultichainService } from '../services/MultichainService';

@JsonController()
export class TasksController {

    constructor(
        private multichainService: MultichainService
    ) { }

    @Get('/wallet/:address/tasks')
    public find(@Param('address') address: string): Promise<Task[]> {
        return this.multichainService.getTasks(address);
    }

    @Put('/wallet/:address/tasks/:issueId')
    @OnUndefined(TaskNotFoundError)
    public update(@Param('address') address: string, @Param('issueId') issueId: string, @Body() task: Task): Promise<Task> {
        return this.multichainService.updateTask(address, issueId, task);
    }

}
