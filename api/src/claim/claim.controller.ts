import { Get, Post, Controller, Param, Body, Put } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimDto } from './dto/claim.dto';
import { Claim } from './interfaces/claim.interface';

//Swagger
import { ApiUseTags } from '@nestjs/swagger';

@Controller('/wallet')
export class ClaimController {
    constructor(private readonly claimtService: ClaimService) { }

    @ApiUseTags('Claim')
    @Get(':address/claim')
    async getClaims(@Param('address') add: string): Promise<Claim[]> {
        return this.claimtService.getClaim(add);
    }

    @ApiUseTags('Claim')
    @Post(':address/claim')
    async postClaim(@Body() claimDto: ClaimDto, @Param('address') add: string): Promise<Claim> {
        return this.claimtService.postClaim(add, claimDto);
    }

    @ApiUseTags('Claim')
    @Get(':address/claim/:id')
    async getClaimById(@Param('address') add: string, @Param('id') id: string): Promise<Claim> {
        return this.claimtService.getClaimById(add, id);
    }

    @ApiUseTags('Claim')
    @Put(':address/claim/:id')
    async updateClaimById(@Body() claimDto: ClaimDto, @Param('address') add: string, @Param('id') id: string): Promise<Claim> {
        return this.claimtService.putClaimById(add, id, claimDto);
    }
    
}