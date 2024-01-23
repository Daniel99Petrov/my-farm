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
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Post()
  async createFarm(@Body() createProcessingDto: CreateProcessingDto) {
    const createdProcessing = await this.processingService.create(
      createProcessingDto.growingPeriodId,
      createProcessingDto.processingTypeId,
      createProcessingDto.machineId,
      createProcessingDto.date,
    );
    return { success: true, data: createdProcessing };
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
