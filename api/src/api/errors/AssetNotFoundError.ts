import { HttpError } from 'routing-controllers';

export class AssetNotFoundError extends HttpError {
    constructor() {
        super(404, 'Asset not found!');
    }
}
