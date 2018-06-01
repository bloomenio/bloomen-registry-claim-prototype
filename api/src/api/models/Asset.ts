import { IsNotEmpty } from 'class-validator';

export class Asset {

    public id: string;

    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    public author: string;
    @IsNotEmpty()
    public description: string;
    @IsNotEmpty()
    public date: Date;

    public toString(): string {
        return `${this.name}`;
    }

}
