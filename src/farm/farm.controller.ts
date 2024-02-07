import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Roles } from 'src/user/roles.decorator';
import { UserRoles } from 'src/user/user-role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('farm')
@UseGuards(RolesGuard)
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Get()
  async findAll() {
    return await this.farmService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.farmService.findOne(id);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Post()
  async create(@Body() createFarmDto: CreateFarmDto) {
    const createdFarm = await this.farmService.create(
      createFarmDto.name,
      createFarmDto.latitude,
      createFarmDto.longitude,
    );
    return createdFarm;
  }

  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    const updatedFarm = await this.farmService.update(id, updateFarmDto);
    return { success: true, data: updatedFarm };
  }

  @Roles(UserRoles.OWNER)
  @Delete(':id/permanent')
  async removePermanent(@Param('id', ParseUUIDPipe) id: string) {
    return await this.farmService.removePermanent(id);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Delete(':id')
  async removeSoft(@Param('id', ParseUUIDPipe) id: string) {
    return await this.farmService.removeSoft(id);
  }
}
