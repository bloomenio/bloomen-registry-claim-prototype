import { IsString, IsInt } from 'class-validator';

export class RegistryDto {
  @IsString() readonly name: string;

  @IsString() readonly author: string;

  @IsString() readonly description: string;
}