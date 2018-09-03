import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TaskDto {
    @ApiModelProperty()
    @IsString() readonly description: string;

    @ApiModelProperty()
    @IsString() readonly to: string;
}