import { Injectable, LoggerService } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule, defaults } from 'nest-schedule';

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
/* var abiTask = [ 
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
          "name": "issueId",
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
          "name": "issueId",
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
          "name": "_issueId",
          "type": "uint256"
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
    }
  ];*/

var addrWallet = '0x844dccbe93f6b47e5c0e1b7fb9e1bfd9e14b78d3'; //Demo2Wallet
/* var addrTask = '0x822be334c5c5efac67441948f8afc907887603ea'; */

var walletContract = new web3.eth.Contract(abiWallet, addrWallet);
// var taskContract = new web3.eth.Contract(abiTask, addrTask);
var initialAddress = '0x89eb0d7A5f7692a5D2b24276F9C1B10cA7Df601A';
var accountAddress = "0xE0FeE2336a7c23f75acea2be3917ebc9AC7a1156";

export class NestLogger implements LoggerService {
    log(message: string): any {
        console.log(message);
    }

    error(message: string, trace: string): any {
        console.error(message, trace);
    }

    warn(message: string): any {
        console.warn(message);
    }
}

defaults.enable = true;
defaults.logger = new NestLogger();
defaults.maxRetry = 10;
defaults.retryInterval = 10;


@Injectable()
export class ScheduleService extends NestSchedule {

    private last_block = 0;

    constructor() {
        super();
    }

    @Cron('* * * * *', {
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 1),
        tz: 'Asia/Shanghai',
    })
    async syncData() {
        console.log('syncing data ...');
        try {
            walletContract.methods.createAddress(accountAddress).send({ from: initialAddress, gas: 100000 })
                .then(() => walletContract.getPastEvents('AllEvents', { fromBlock: this.last_block, toBlock: 'latest' }, (err, events) => {
                    if (err)
                        console.log(err);
                    else {
                        this.last_block = web3.eth.getBlock('latest').number;
                        console.log(events);
                    }
                }));
                /* taskContract.methods.createTask('first task', accountAddress, 1, 1, accountAddress).send({ from: initialAddress, gas: 6721975 })
                .then(() => taskContract.getPastEvents('AllEvents', { fromBlock: this.last_block, toBlock: 'latest' }, (err, events) => {
                    if (err)
                        console.log(err);
                    else {
                        this.last_block = web3.eth.getBlock('latest').number;
                        console.log(events);
                    }
                })); */
        }
        catch(err){
            console.error(err.message);
        }
    }

}
