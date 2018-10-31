import { Injectable, LoggerService } from '@nestjs/common';
import { Cron, Interval, NestSchedule, defaults } from 'nest-schedule';
import * as solr from 'solr-client';
import * as Web3 from 'web3';
import { Container } from 'typedi';
import { SolrService } from '../solr/solr.service';
import { RegistrySolr } from './models/registrySolr.interface';

var fs = require('fs');
var Q = require('q');

var web3 = new Web3('ws://localhost:7545');

var walletFile = "../ethereum/build/contracts/Demo2Wallet.json";
var compiledWallet = JSON.parse(fs.readFileSync(walletFile, 'utf8'));
var abiWallet = compiledWallet.abi;

var registryFile = "../ethereum/build/contracts/Demo2Registry.json";
var compiledRegistry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
var abiRegistry = compiledRegistry.abi;

var addrWallet = '0xc5494d3540ff7d4107b03b4c2f490d267964df1a';
var walletContract = new web3.eth.Contract(abiWallet, addrWallet);
var initialAddress = '0x235e90B0bB3F4c0875a96456d451a5733fb3C025';
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

    private last_block_number: any = 0;
    public client: any = solr.createClient('localhost', '8983', 'demo-bloomen-registry-claim-m12', '/solr');
    public solrService: SolrService = Container.get(SolrService);

    constructor() {
        super();
        this.solrService.setInstance(this.client);
    }

    @Interval(10000)
    async syncData() {
        console.log('Syncing blocks ...');

        let latest_block: any = await web3.eth.getBlock('latest');

        if (latest_block.number > this.last_block_number) {
            walletContract.getPastEvents('AssetCreated', { fromBlock: this.last_block_number + 1, toBlock: latest_block.number })
                .then(async events => {
                    this.last_block_number = latest_block.number;
                    if (events.length > 0) {
                        console.log(events.length + " new events.");
                        console.log('Saving to Solr ...');
                        let solrEvents: RegistrySolr[] = [];
                        for (let event of events) {
                            let asset = event.returnValues;
                            let registry: RegistrySolr = {
                                assetId_i: asset.assetId,
                                assetOwner_s: asset.assetOwner,
                                name_s: asset.name,
                                author_s: asset.author,
                                description_s: asset.description
                            };
                            console.log(registry);
                            solrEvents.push(registry);
                        }
                        await this.solrService.addDocuments(solrEvents);
                        console.log('Done.');
                    } else {
                        console.log('No new events.');
                    }
                }, error => {
                    console.log(error);
                });
        } else {
            console.log('Already up to date.');
        }

        // try {
        //     walletContract.methods.createAddress(accountAddress).send({ from: initialAddress, gas: 100000 })
        //         .then(() => walletContract.getPastEvents('AllEvents', { fromBlock: this.last_block, toBlock: 'latest' }, (err, events) => {
        //             if (err)
        //                 console.log(err);
        //             else {
        //                 this.last_block = web3.eth.getBlock('latest').number;
        //                 console.log(events);
        //             }
        //         }));
        //         /* taskContract.methods.createTask('first task', accountAddress, 1, 1, accountAddress).send({ from: initialAddress, gas: 6721975 })
        //         .then(() => taskContract.getPastEvents('AllEvents', { fromBlock: this.last_block, toBlock: 'latest' }, (err, events) => {
        //             if (err)
        //                 console.log(err);
        //             else {
        //                 this.last_block = web3.eth.getBlock('latest').number;
        //                 console.log(events);
        //             }
        //         })); */
        // }
        // catch(err){
        //     console.error(err.message);
        // }
    }

}
