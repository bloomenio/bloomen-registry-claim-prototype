import { Injectable } from '@nestjs/common';
import { Wallet } from './interfaces/wallet.interface';
import { RegistryDto } from './dto/registry.dto';
import { Registry } from './interfaces/registry.interface';
import { Claim } from './interfaces/claim.interface';
import { Task } from './interfaces/task.interface';
import { ClaimDto } from './dto/claim.dto';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class WalletService {

    private readonly wallets: Wallet[] = [];
    private readonly registries: Registry[] = [];
    private readonly claims: Claim[] = [];
    private readonly tasks: Task[] = [];

    getWallet(): Wallet[] {
        return this.wallets;
    }

    postWallet(): Wallet {
        var randomString = require('random-string');
        let x: Wallet = { id: randomString({ length: 20 }) };
        this.wallets.push(x);
        return x;
    }

    postRegistry(address: string, registryDto: RegistryDto): Registry {
        for (let i = 0; i < this.wallets.length; ++i) {
            if (address == this.wallets[i].id) {
                var randomString = require('random-string');
                let r: Registry = {
                    assetId: randomString({ length: 20 }),
                    assetOwner: address,
                    name: registryDto.name,
                    author: registryDto.author,
                    description: registryDto.description
                }
                this.registries.push(r);
                return r;
            }
        }
    }

    getRegistry(address: string, id: string) {
        for (let i = 0; i < this.registries.length; ++i) {
            if (this.registries[i].assetOwner == address && this.registries[i].assetId == id)
                return this.registries[i];
        }
    }

    updateRegistry(address: string, id: string, registryDto: RegistryDto) {
        for (let i = 0; i < this.registries.length; ++i) {
            if (this.registries[i].assetOwner == address && this.registries[i].assetId == id) {
                this.registries[i] = {
                    assetId: this.registries[i].assetId,
                    assetOwner: this.registries[i].assetOwner,
                    name: registryDto.name,
                    author: registryDto.author,
                    description: registryDto.description
                }
                return this.registries[i];
            }
        }
    }

    getClaim(add: string) {
        let x: Claim[] = [];
        for (let i = 0; i < this.claims.length; ++i) {
            if (this.claims[i].claimOwner == add) {
                x.push(this.claims[i]);
            }
        }
        return x;
    }

    postClaim(add: string, claimDto: ClaimDto) {
        var randomString = require('random-string');
        let x: Claim = {
            assetId: claimDto.assetId,
            assetOwner: claimDto.assetOwner,
            description: claimDto.description,
            claimId: randomString({ length: 20 }),
            issueId: randomString({ length: 20 }),
            claimOwner: add
        }
        this.claims.push(x);
        this.tasks.push({
            description: "Initial claim msg",
            to: x.assetOwner,
            from: x.claimOwner,
            issueId: x.claimId
        });
        return x;
    }

    getClaimById(add: string, id: string) {
        for (let i = 0; i < this.claims.length; ++i) {
            if (this.claims[i].claimOwner == add && this.claims[i].claimId == id) {
                return this.claims[i];
            }
        }
    }

    putClaimById(add: string, id: string, claimDto: ClaimDto) {
        for (let i = 0; i < this.claims.length; ++i) {
            if (this.claims[i].claimOwner == add && this.claims[i].claimId == id) {
                this.claims[i] = {
                    assetId: claimDto.assetId,
                    assetOwner: claimDto.assetOwner,
                    description: claimDto.description,
                    claimId: this.claims[i].claimId,
                    issueId: this.claims[i].issueId,
                    claimOwner: this.claims[i].claimOwner
                }
                return this.claims[i];
            }
        }
    }

    getTask(add: string): Task[] {
        let x: Task[] = [];
        for (let i = 0; i < this.tasks.length; ++i) {
            if (this.tasks[i].to == add) {
                x.push(this.tasks[i]);
            }
        }
        return x;
    }

    updateTask(add: string, id: string, taskDto: TaskDto): Task {
        let x: Task = undefined;
        for (let i = 0; i < this.tasks.length; ++i) {
            if (this.tasks[i].to == add && this.tasks[i].issueId == id) {
                this.tasks[i] = {
                    description: taskDto.description,
                    to: taskDto.to,
                    from: add,
                    issueId: this.tasks[i].issueId
                }
                x = this.tasks[i];
            }
        }
        return x;
    }
}   
