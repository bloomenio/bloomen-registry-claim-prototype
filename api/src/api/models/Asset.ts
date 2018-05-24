import { IsNotEmpty } from 'class-validator';

export class Asset {

    public id: string;

    @IsNotEmpty()
    public name: string;

    public toString(): string {
        return `${this.name}`;
    }

}
