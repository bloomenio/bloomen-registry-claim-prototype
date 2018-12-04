import { Injectable, HttpException } from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { TaskDto } from './dto/task.dto';
import { Web3Service } from '../web3/web3.service';

var fs = require('fs');
var Q = require('q');

@Injectable()
export class TaskService {

  public walletContract;

  constructor(private web3Service: Web3Service) {
    this.walletContract = this.web3Service.getWalletContract();
  }

  getTask(add: string): Promise<Task[]> {
    return new Promise<Task[]>((resolve, reject) => {

      this.walletContract.methods.getTaskAddress(add).call({ from: add })
        .then(taskAddress => {
          var taskContract = this.web3Service.createContract(this.web3Service.getAbiTask(), taskAddress);
          taskContract.methods.tasksNumber().call({ from: add })
            .then(tasksNumber => {
              let tasksArray: Task[] = [];
              let taskPromises: any[] = [];
              var i;
              for (i = 1; i <= tasksNumber; i++) {
                taskPromises.push(taskContract.methods.tasks(i).call({ from: add }));
                taskPromises.push(taskContract.methods.getHistories(i).call({ from: add }));
              }
              Q.all(taskPromises).then(tasks => {
                for (let i = 0; i < tasks.length; i += 2) {
                  let task: Task = {
                    claimId: tasks[i].claimId,
                    description: tasks[i].description,
                    to: tasks[i].to,
                    taskId: tasks[i].taskId,
                    from: tasks[i].from,
                    history: tasks[i + 1]
                  };
                  tasksArray.push(task);
                }
                resolve(tasksArray);
              }, reject);
            }, reject);
        }, reject);
    });

  }

  updateTask(add: string, id: string, taskDto: TaskDto): Promise<Task> {
    return new Promise<Task>((resolve, reject) => {
      this.walletContract.methods.getTaskAddress(add).call({ from: add })
        .then(taskAddress => {
          var taskContract = this.web3Service.createContract(this.web3Service.getAbiTask(), taskAddress);
          taskContract.methods.updateTask(id, taskDto.description, taskDto.to).send({ from: add, gas: 1000000 })
            .then(async algo => {
              let taskPromises: any[] = [];
              let task = await taskContract.methods.tasks(id).call({ from: add });
              let history = await taskContract.methods.getHistories(id).call({ from: add });
              let taskModel: Task = {
                claimId: task.claimId,
                description: task.description,
                to: task.to,
                taskId: task.taskId,
                from: task.from,
                history: history
              };
              resolve(taskModel);
            }, reject);
        }, reject);
    });
  }

}