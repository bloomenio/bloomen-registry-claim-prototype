import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Pet } from '../models/Pet';
import { User } from '../models/User';

@Service()
export class PetService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Pet[]> {
        this.log.info('Find all pets');
        return undefined;
    }

    public findByUser(user: User): Promise<Pet[]> {
        this.log.info('Find all pets of the user', user.toString());
        return undefined;
    }

    public findOne(id: string): Promise<Pet | undefined> {
        this.log.info('Find all pets');
        return undefined;
    }

    public async create(pet: Pet): Promise<Pet> {
        this.log.info('Create a new pet => ', pet.toString());
        return undefined;
    }

    public update(id: string, pet: Pet): Promise<Pet> {
        this.log.info('Update a pet');
        pet.id = id;
        return undefined;
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a pet');
        return;
    }

}
