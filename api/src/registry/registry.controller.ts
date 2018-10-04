import { Get, Post, Controller, Param, Body, Put } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { RegistryDto } from './dto/registry.dto';
import { Registry } from './interfaces/registry.interface';

//Swagger
import { ApiUseTags } from '@nestjs/swagger';

@Controller('/wallet')
export class RegistryController {
    constructor(private readonly registrytService: RegistryService) { }

    @ApiUseTags('Registry')
    @Post(':address/registry')
    async postRegistry(@Body() registryDto: RegistryDto, @Param('address') add: string): Promise<Registry> {
        return this.registrytService.postRegistry(add, registryDto);
    }

    @ApiUseTags('Registry')
    @Get(':address/registry/:id')
    async getRegistry(@Param('address') add: string, @Param('id') id: string): Promise<Registry> {
        return this.registrytService.getRegistry(add, id);
    }

    @ApiUseTags('Registry')
    @Put(':address/registry/:id')
    async updateRegistry(@Body() registryDto: RegistryDto, @Param('address') add: string, @Param('id') id: string): Promise<Registry> {
        return this.registrytService.updateRegistry(add, id, registryDto);
    }

}
