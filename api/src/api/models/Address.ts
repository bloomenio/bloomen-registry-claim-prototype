import { IsNotEmpty } from 'class-validator';

export class Address {

    public id: string;

    @IsNotEmpty()
    public name: string;

    public toString(): string {
        return `${this.name}`;
    }

}
