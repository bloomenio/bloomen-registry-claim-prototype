import { IsString, IsInt } from 'class-validator';

export class ClaimDto {
    @IsString() readonly assetId: string;
    @IsString() readonly assetOwner: string;
    @IsString() readonly description: string;
}