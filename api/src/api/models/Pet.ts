import { IsNotEmpty } from 'class-validator';

import { User } from './User';

export class Pet {

    public id: string;

    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public age: number;

    public userId: number;

    public user: User;

    public toString(): string {
        return `${this.name}`;
    }

}
