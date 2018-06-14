import { IsNotEmpty } from 'class-validator';

export class Claim {

    public claimId: string;
    public claimOwner: string;

    public assetId: string;
    public assetOwner: string;

    public issueId: string;

    @IsNotEmpty()
    public description: string;

}
