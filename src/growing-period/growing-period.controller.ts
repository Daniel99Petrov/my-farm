import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { GrowingPeriodService } from './growing-period.service';
import { CreateGrowingPeriodDto } from './dto/create-growing-period.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRoles } from 'src/user/user-role.enum';
import { Roles } from 'src/user/roles.decorator';
import { GrowingPeriod } from './entities/growing-period.entity';

@Controller('growing-period')
@UseGuards(RolesGuard)
export class GrowingPeriodController {
  constructor(private readonly growingPeriodService: GrowingPeriodService) {}

  @Get()
  async findAll() {
    return await this.growingPeriodService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.growingPeriodService.findOne(id);
  }
  @Get('by-field/:fieldId')
  async findAllByField(
    @Param('fieldId') fieldId: string,
  ): Promise<GrowingPeriod[]> {
    const growingPeriods = this.growingPeriodService.findAllByCondition({
      fieldId,
    });
    return growingPeriods;
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Post()
  async create(@Body() createGrowingPeriodDto: CreateGrowingPeriodDto) {
    const createdGrowingPeriod = await this.growingPeriodService.create(
      createGrowingPeriodDto,
    );
    return createdGrowingPeriod;
  }

  @Roles(UserRoles.OWNER)
  @Delete(':id/permanent')
  async removePermanent(@Param('id', ParseUUIDPipe) id: string) {
    return await this.growingPeriodService.removePermanent(id);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Delete(':id')
  async removeSoft(@Param('id', ParseUUIDPipe) id: string) {
    return await this.growingPeriodService.removeSoft(id);
  }
}
