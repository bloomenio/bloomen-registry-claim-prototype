import { IsNotEmpty } from 'class-validator';

export class ClaimResponse {

    @IsNotEmpty()
    public name: string;

    public toString(): string {
        return `${this.name}`;
    }

}
