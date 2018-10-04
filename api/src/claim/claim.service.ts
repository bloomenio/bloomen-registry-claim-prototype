import { Injectable, HttpException } from '@nestjs/common';
import { Claim } from './interfaces/claim.interface';
import { ClaimDto } from './dto/claim.dto';

@Injectable()
export class ClaimService {

    private readonly claims: Claim[] = [];

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
        if (add != claimDto.assetOwner) {
            let x: Claim = {
                assetId: claimDto.assetId,
                assetOwner: claimDto.assetOwner,
                description: claimDto.description,
                claimId: randomString({ length: 20 }),
                issueId: randomString({ length: 20 }),
                claimOwner: add
            }
            this.claims.push(x);
            // this.tasks.push({
            //     description: "Initial claim msg",
            //     to: x.assetOwner,
            //     from: x.claimOwner,
            //     issueId: x.issueId
            // });
            return x;
        }
        else {
            throw HttpException;
        }
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

}