import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ClaimDto {
    @ApiModelProperty()
    @IsString() readonly assetId: string;

    @ApiModelProperty()
    @IsString() readonly assetOwner: string;

    @ApiModelProperty()
    @IsString() readonly description: string;
}