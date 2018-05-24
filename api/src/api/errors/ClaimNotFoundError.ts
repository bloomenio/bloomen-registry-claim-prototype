import { HttpError } from 'routing-controllers';

export class ClaimNotFoundError extends HttpError {
    constructor() {
        super(404, 'Claim not found!');
    }
}
