import { Injectable, HttpException } from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { TaskDto } from './dto/task.dto';

import * as Web3 from 'web3';

var web3 = new Web3('ws://localhost:7545');
var abiWallet = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "userAddresses",
        "type": "address[]"
      }
    ],
    "name": "AddressAdded",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAddress",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newAddress",
        "type": "address"
      }
    ],
    "name": "createAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getClaimAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getRegistryAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getTaskAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
var abiTask = [
  {
    "constant": true,
    "inputs": [],
    "name": "claimAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tasks",
    "outputs": [
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "taskId",
        "type": "uint256"
      },
      {
        "name": "claimId",
        "type": "uint256"
      },
      {
        "name": "claimOwner",
        "type": "address"
      },
      {
        "name": "from",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "taskId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "claimId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "claimOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "from",
        "type": "address"
      }
    ],
    "name": "TaskCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "taskId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "claimId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "claimOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "from",
        "type": "address"
      }
    ],
    "name": "TaskUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_claimId",
        "type": "uint256"
      },
      {
        "name": "_claimOwner",
        "type": "address"
      }
    ],
    "name": "createTask",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_taskId",
        "type": "uint256"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "updateTask",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_claimAddress",
        "type": "address"
      }
    ],
    "name": "setClaimAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

var addrWallet = '0xc5494d3540ff7d4107b03b4c2f490d267964df1a';
var walletContract = new web3.eth.Contract(abiWallet, addrWallet);
var initialAddress = '0x235e90B0bB3F4c0875a96456d451a5733fb3C025';
// var accountAddress = "0xE0FeE2336a7c23f75acea2be3917ebc9AC7a1156";

@Injectable()
export class TaskService {

  private readonly tasks: Task[] = [];

  getTask(add: string): Task[] {
    let x: Task[] = [];
    for (let i = 0; i < this.tasks.length; ++i) {
      if (this.tasks[i].to == add) {
        x.push(this.tasks[i]);
      }
    }
    return x;
  }

  updateTask(add: string, id: string, taskDto: TaskDto): Promise<Task> {
    return new Promise<Task>((resolve, reject) => {
      walletContract.methods.getTaskAddress(add).call({ from: initialAddress })
        .then(taskAddress => {
          var taskContract = new web3.eth.Contract(abiTask, taskAddress);
          taskContract.methods.updateTask(id, taskDto.description, taskDto.to).send({ from: add, gas: 1000000 })
            .then(() => {
              taskContract.getPastEvents('TaskUpdated', { fromBlock: 0, toBlock: 'latest' })
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