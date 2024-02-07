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
import { ProcessingService } from './processing.service';
import { CreateProcessingDto } from './dto/create-processing.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/user/roles.decorator';
import { UserRoles } from 'src/user/user-role.enum';
import { Processing } from './entities/processing.entity';

@Controller('processing')
@UseGuards(RolesGuard)
export class ProcessingController {
  constructor(private readonly processingService: ProcessingService) {}

  @Get()
  async findAll() {
    return await this.processingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.processingService.findOne(id);
  }

  @Get('by-growing-period/:growingPeriodId')
  async findAllByGrowingPeriod(
    @Param('growingPeriodId') growingPeriodId: string,
  ): Promise<Processing[]> {
    return this.processingService.findAllByCondition({ growingPeriodId });
  }

  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Post()
  async create(@Body() createProcessingDto: CreateProcessingDto) {
    const createdProcessing = await this.processingService.create(
      createProcessingDto.growingPeriodId,
      createProcessingDto.processingTypeId,
      createProcessingDto.machineId,
      createProcessingDto.date,
    );
    return { createdProcessing };
  }

  @Roles(UserRoles.OWNER)
  @Delete(':id/permanent')
  async removePermanent(@Param('id', ParseUUIDPipe) id: string) {
    return await this.processingService.removePermanent(id);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Delete(':id')
  async removeSoft(@Param('id', ParseUUIDPipe) id: string) {
    return await this.processingService.removeSoft(id);
  }
}
