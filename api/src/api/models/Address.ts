import { IsNotEmpty } from 'class-validator';

export class Address {

    public id: string;

    @IsNotEmpty()
    public name: string;

    constructor(name: string) {
        this.id = name;
        this.name = name;
    }

    public toString(): string {
        return `${this.name}`;
    }

}
