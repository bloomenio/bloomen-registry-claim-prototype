import { IsNotEmpty } from 'class-validator';

export class Address {
    @IsNotEmpty()
    public id: string;

    constructor(id: string) {
        this.id = id;
    }

}
