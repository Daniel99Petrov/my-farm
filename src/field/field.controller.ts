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
import { FieldService } from './field.service';
import { CreateFieldDto } from './dto/create-field.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRoles } from 'src/user/user-role.enum';
import { Roles } from 'src/user/roles.decorator';
import { UpdateFieldDto } from './dto/update-field.dto';
import { Field } from './entities/field.entity';

@Controller('field')
@UseGuards(RolesGuard)
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Get()
  async findAll() {
    return await this.fieldService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.fieldService.findOne(id);
  }
  @Get('by-farm/:farmId')
  async findAllByFarm(@Param('farmId') farmId: string): Promise<Field[]> {
    return this.fieldService.findAllByCondition({ farmId });
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Post()
  async createFarm(@Body() createFieldDto: CreateFieldDto) {
    const createdField = await this.fieldService.create(
      createFieldDto.name,
      createFieldDto.borders,
      createFieldDto.farmId,
      createFieldDto.soilId,
    );
    return createdField;
  }

  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Patch(':id')
  async updateFarm(
    @Param('id') id: string,
    @Body() updateFieldDto: UpdateFieldDto,
  ) {
    const updatedFarm = await this.fieldService.updateField(id, updateFieldDto);
    return { success: true, data: updatedFarm };
  }

  @Roles(UserRoles.OWNER)
  @Delete(':id/permanent')
  async removePermanent(@Param('id', ParseUUIDPipe) id: string) {
    return await this.fieldService.removePermanent(id);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Delete(':id')
  async removeSoft(@Param('id', ParseUUIDPipe) id: string) {
    return await this.fieldService.removeSoft(id);
  }
}
