import { IsNotEmpty } from 'class-validator';

export class Claim {

    public id: string;

    @IsNotEmpty()
    public description: string;

    public issueRef: string;

    @IsNotEmpty()
    public assetRef: string;
    @IsNotEmpty()
    public ownerRef: string;

}
