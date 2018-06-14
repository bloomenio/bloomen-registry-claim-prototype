import { IsNotEmpty } from 'class-validator';

export class Task {

    public issueId: string;
    public claimId: string;
    public claimOwner: string;

    public from: string;
    public to: string;

    @IsNotEmpty()
    public description: string;
}
