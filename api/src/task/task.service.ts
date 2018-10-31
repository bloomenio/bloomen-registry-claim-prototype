import { Injectable, HttpException } from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { TaskDto } from './dto/task.dto';

import * as Web3 from 'web3';
var fs = require('fs');
var Q = require('q');

var web3 = new Web3('ws://localhost:7545');

var walletFile = "../ethereum/build/contracts/Demo2Wallet.json";
var compiledWallet = JSON.parse(fs.readFileSync(walletFile, 'utf8'));
var abiWallet = compiledWallet.abi;

var taskFile = "../ethereum/build/contracts/Demo2Task.json";
var compiledTask = JSON.parse(fs.readFileSync(taskFile, 'utf8'));
var abiTask = compiledTask.abi;

var addrWallet = '0xc5494d3540ff7d4107b03b4c2f490d267964df1a';
var walletContract = new web3.eth.Contract(abiWallet, addrWallet);
// var accountAddress = "0xE0FeE2336a7c23f75acea2be3917ebc9AC7a1156";

@Injectable()
export class TaskService {

  getTask(add: string): Promise<Task[]> {
    return new Promise<Task[]>((resolve, reject) => {

      walletContract.methods.getTaskAddress(add).call({ from: add })
        .then(taskAddress => {
          var taskContract = new web3.eth.Contract(abiTask, taskAddress);
          taskContract.methods.tasksNumber().call({ from: add })
            .then(tasksNumber => {
              let tasksArray: Task[] = [];
              let taskPromises: Promise<any>[] = [];
              var i;
              for (i = 1; i <= tasksNumber; i++) {
                taskPromises.push(taskContract.methods.tasks(i).call({ from: add }));
              }
              Q.all(taskPromises).then(tasks => {
                for (let asset of tasks) {
                  let task: Task = {
                    claimId: asset.claimId,
                    description: asset.description,
                    to: asset.to,
                    taskId: asset.taskId,
                    from: asset.from
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
      walletContract.methods.getTaskAddress(add).call({ from: add })
        .then(taskAddress => {
          var taskContract = new web3.eth.Contract(abiTask, taskAddress);
          taskContract.methods.updateTask(id, taskDto.description, taskDto.to).send({ from: add, gas: 1000000 })
            .then(() => {
              walletContract.getPastEvents('TaskUpdated', { fromBlock: 0, toBlock: 'latest' })
                .then(events => {
                  let asset = events[events.length - 1].returnValues;
                  let task: Task = {
                    claimId: asset.claimId,
                    description: asset.description,
                    to: asset.to,
                    taskId: asset.taskId,
                    from: asset.from
                  };
                  resolve(task);
                }, reject);
            }, reject);
        }, reject);
    });
  }

}