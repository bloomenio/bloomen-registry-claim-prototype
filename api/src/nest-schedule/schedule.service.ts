import { Injectable, LoggerService } from '@nestjs/common';
import { Cron, Interval, NestSchedule, defaults } from 'nest-schedule';
import * as solr from 'solr-client';
import * as Web3 from 'web3';
import { Container } from 'typedi';
import { SolrService } from '../solr/solr.service';
import { RegistrySolr } from './models/registrySolr.interface';
require('dotenv').config();

var fs = require('fs');
var Q = require('q');

var web3: any = new Web3("http://" + process.env.GETH_HOST + ":" + process.env.GETH_PORT);

var walletFile = "../ethereum/build/contracts/Demo2Wallet.json";
var compiledWallet = JSON.parse(fs.readFileSync(walletFile, 'utf8'));
var abiWallet = compiledWallet.abi;
var walletAddress = compiledWallet.networks[process.env.GETH_NETWORK_ID].address


var registryFile = "../ethereum/build/contracts/Demo2Registry.json";
var compiledRegistry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
var abiRegistry = compiledRegistry.abi;


var walletContract = new web3.eth.Contract(abiWallet, walletAddress);

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
    public client: any = solr.createClient(process.env.SOLR_HOST, process.env.SOLR_PORT, process.env.SOLR_CORE, process.env.SOLR_PATH );
    public solrService: SolrService = Container.get(SolrService);

    constructor() {
        super();
        this.solrService.setInstance(this.client);
    }

    @Interval(10000)
    async syncData() {
        console.log('Syncing blocks ...');

        const latest_block: number = await web3.eth.getBlockNumber();

        if (latest_block > this.last_block_number) {
            walletContract.getPastEvents('AssetCreated', { fromBlock: this.last_block_number + 1, toBlock: latest_block.number })
                .then(async events => {
                    this.last_block_number = latest_block;
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
    }

}
