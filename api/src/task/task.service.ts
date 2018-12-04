import { Injectable, HttpException } from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { TaskDto } from './dto/task.dto';
//import { Web3Service } from '../web3/web3.service';

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

  /* public walletContract;
  public compiledWallet;
  public abiWallet;

  public compiledTask;
  public abiTask;

  constructor(private web3Service: Web3Service) {
    //this.compiledWallet = JSON.parse(fs.readFileSync(this.web3Service.getWalletFile(), 'utf8'));
    //this.abiWallet = this.compiledWallet.abi; 
    this.walletContract = this.web3Service.getWalletContract();//this.web3Service.getWalletContract();// this.web3Service.createContract(this.abiWallet, this.compiledWallet.networks[process.env.NETWORK_ID].address);

    this.compiledTask = JSON.parse(fs.readFileSync(this.web3Service.getTaskFile(), 'utf8'));
    this.abiTask = this.compiledTask.abi;
  } */

  getTask(add: string): Promise<Task[]> {
    return new Promise<Task[]>((resolve, reject) => {

      /* this. */walletContract.methods.getTaskAddress(add).call({ from: add })
        .then(taskAddress => {
          var taskContract = new web3.eth.Contract(abiTask, taskAddress);
          //this.web3Service.createContract(this.abiTask, taskAddress);
          taskContract.methods.tasksNumber().call({ from: add })
            .then(tasksNumber => {
              let tasksArray: Task[] = [];
              let taskPromises: any[] = [];
              var i;
              for (i = 1; i <= tasksNumber; i++) {
                // let taskData: Promise<any>[] = [
                //   taskContract.methods.tasks(i).call({ from: add }),
                //   taskContract.methods.getHistories(i).call({ from: add })
                // ];  
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
      /* this. */walletContract.methods.getTaskAddress(add).call({ from: add })
        .then(taskAddress => {
          var taskContract = new web3.eth.Contract(abiTask, taskAddress);
          //var taskContract = this.web3Service.createContract(this.abiTask, taskAddress);
          taskContract.methods.updateTask(id, taskDto.description, taskDto.to).send({ from: add, gas: 1000000 })
            .then(async algo => {
              let taskPromises: any[] = [];
              console.log(id);
              let task = await taskContract.methods.tasks(id).call({ from: add });
              // taskPromises.push(tasks);
              console.log(task);
              let history = await taskContract.methods.getHistories(id).call({ from: add });
              // taskPromises.push(history);
              console.log(history);
              // Q.all(taskPromises).then(tasks => {
              console.log("update");
              console.log(task);
              let taskModel: Task = {
                claimId: task.claimId,
                description: task.description,
                to: task.to,
                taskId: task.taskId,
                from: task.from,
                history: history
              };
              resolve(taskModel);
              // }, reject);
            }, reject);
        }, reject);
    });
  }

}