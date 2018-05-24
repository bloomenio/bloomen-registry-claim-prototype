import {
    Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { PetNotFoundError } from '../errors/PetNotFoundError';
import { Pet } from '../models/Pet';
import { MultichainService } from '../services/MultichainService';
import { PetService } from '../services/PetService';
import { SolrService } from '../services/SolrService';

@JsonController('/pets')
export class PetController {

    constructor(
        private petService: PetService,
        private multichainService: MultichainService,
        private solrService: SolrService
    ) { }

    @Get()
    public find(): Promise<Pet[]> {
        this.multichainService.sayHello();
        this.solrService.sayHello();
        return this.petService.find();
    }

    @Get('/:id')
    @OnUndefined(PetNotFoundError)
    public one( @Param('id') id: string): Promise<Pet | undefined> {
        return this.petService.findOne(id);
    }

    @Post()
    public create( @Body() pet: Pet): Promise<Pet> {
        return this.petService.create(pet);
    }

    @Put('/:id')
    public update( @Param('id') id: string, @Body() pet: Pet): Promise<Pet> {
        return this.petService.update(id, pet);
    }

    @Delete('/:id')
    public delete( @Param('id') id: string): Promise<void> {
        return this.petService.delete(id);
    }

}
