import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class RegistryDto {
  @ApiModelProperty()
  @IsString() readonly name: string;

  @ApiModelProperty()
  @IsString() readonly author: string;

  @ApiModelProperty()
  @IsString() readonly description: string;
}