import {
    Body, Get, JsonController, OnUndefined, Param, Put, QueryParam
} from 'routing-controllers';

import { TaskNotFoundError } from '../errors/TaskNotFoundError';
import { Task } from '../models/Task';
import { MultichainService } from '../services/MultichainService';

@JsonController()
export class TasksController {

    constructor(
        private multichainService: MultichainService
    ) { }

    @Get('/wallet/:address/tasks')
    public find(@Param('address') address: string, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number): Promise<Task[]> {
        return this.multichainService.getTasks(address);
    }

    @Put('/wallet/:address/tasks/:id')
    @OnUndefined(TaskNotFoundError)
    public update(@Param('address') address: string, @Param('id') id: string, @Body() task: Task): Promise<Task> {
        return this.multichainService.updateTask(address, id, task);
    }

}
