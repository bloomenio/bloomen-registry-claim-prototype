import { IsNotEmpty } from 'class-validator';

export class Asset {

    public assetId: string;
    public assetOwner: string;

    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    public author: string;
    @IsNotEmpty()
    public description: string;

}
