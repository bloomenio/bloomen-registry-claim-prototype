import { Get, Controller, Param, Body, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import { Task } from './interfaces/task.interface';

//Swagger
import { ApiUseTags } from '@nestjs/swagger';

@Controller('/wallet')
export class TaskController {
    constructor(private readonly tasktService: TaskService) { }

    @ApiUseTags('Tasks')
    @Get(':address/tasks')
    async getTask(@Param('address') add: string): Promise<Task[]> {
        return this.tasktService.getTask(add);
    }

    @ApiUseTags('Tasks')
    @Put(':address/tasks/:taskId')
    async updateTask(@Body() taskDto: TaskDto, @Param('taskId') taskId: string, @Param('address') add: string): Promise<Task> {
        return this.tasktService.updateTask(add, taskId, taskDto);
    }

}