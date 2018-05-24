import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';

@Service()
export class UserService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<User[]> {
        this.log.info('Find all users');
        return undefined;
    }

    public findOne(id: string): Promise<User | undefined> {
        this.log.info('Find all users');
        return undefined;
    }

    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        return undefined;
    }

    public update(id: string, user: User): Promise<User> {
        this.log.info('Update a user');
        user.id = id;
        return undefined;
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a user');
        return;
    }

}
