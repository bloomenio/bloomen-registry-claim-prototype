import { IsNotEmpty } from 'class-validator';

import { Pet } from './Pet';

export class User {

    public id: string;

    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsNotEmpty()
    public email: string;

    public pets: Pet[];

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }

}
