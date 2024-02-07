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
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { UserRoles } from 'src/user/user-role.enum';
import { Roles } from 'src/user/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Machine } from './entities/machine.entity';

@Controller('machine')
@UseGuards(RolesGuard)
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Get()
  async findAll() {
    return await this.machineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.machineService.findOne(id);
  }
  @Get('by-farm/:farmId')
  async findAllByFarm(@Param('farmId') farmId: string): Promise<Machine[]> {
    return this.machineService.findAllByCondition({ farmId });
  }

  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Post()
  async create(@Body() createMachineDto: CreateMachineDto) {
    const createdMachine = await this.machineService.create(
      createMachineDto.brand,
      createMachineDto.model,
      createMachineDto.registrationNumber,
      createMachineDto.farmId,
    );
    return createdMachine;
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ) {
    return await this.machineService.update(id, updateMachineDto);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Patch('transfer/:id/:fromFarmId/:toFarmId')
  async transferMachine(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('fromFarmId', ParseUUIDPipe) fromFarmId: string,
    @Param('toFarmId', ParseUUIDPipe) toFarmId: string,
  ) {
    return await this.machineService.transfer(id, fromFarmId, toFarmId);
  }

  @Roles(UserRoles.OWNER)
  @Delete(':id/permanent')
  async removePermanent(@Param('id', ParseUUIDPipe) id: string) {
    return await this.machineService.removePermanent(id);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Delete(':id')
  async removeSoft(@Param('id', ParseUUIDPipe) id: string) {
    return await this.machineService.removeSoft(id);
  }
}
