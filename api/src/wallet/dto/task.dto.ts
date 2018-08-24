import { IsString, IsInt } from 'class-validator';

export class TaskDto {
    @IsString() readonly description: string;
    @IsString() readonly to: string;
}