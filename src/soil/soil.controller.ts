import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SoilService } from './soil.service';
import { CreateSoilDto } from './dto/create-soil.dto';
import { UserRoles } from 'src/user/user-role.enum';
import { Roles } from 'src/user/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('/soil')
@UseGuards(RolesGuard)
export class SoilController {
  constructor(private readonly soilService: SoilService) {}

  @Get()
  async findAll() {
    return await this.soilService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.soilService.findOne(id);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Post()
  async create(@Body() createSoilDto: CreateSoilDto) {
    return await this.soilService.create(createSoilDto.name);
  }

  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createSoilDto: CreateSoilDto,
  ) {
    return await this.soilService.update(id, createSoilDto);
  }
  @Roles(UserRoles.OWNER)
  @Delete(':id/permanent')
  async removePermanent(@Param('id', ParseUUIDPipe) id: string) {
    return await this.soilService.removePermanent(id);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Delete(':id')
  async removeSoft(@Param('id', ParseUUIDPipe) id: string) {
    return await this.soilService.removeSoft(id);
  }
}
