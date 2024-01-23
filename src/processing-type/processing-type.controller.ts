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
import { ProcessingTypeService } from './processing-type.service';
import { CreateProcessingTypeDto } from './dto/create-processing-type.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserRoles } from 'src/user/user-role.enum';
import { Roles } from 'src/user/roles.decorator';

@Controller('processing-type')
@UseGuards(AuthGuard)
export class ProcessingTypeController {
  constructor(private readonly processingTypeService: ProcessingTypeService) {}

  @Get()
  async findAll() {
    return await this.processingTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.processingTypeService.findOne(id);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Post()
  async create(@Body() createProcessingTypeDto: CreateProcessingTypeDto) {
    return await this.processingTypeService.create(
      createProcessingTypeDto.name,
    );
  }

  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createProcessingTypeDto: CreateProcessingTypeDto,
  ) {
    return await this.processingTypeService.update(id, createProcessingTypeDto);
  }
  @Roles(UserRoles.OWNER)
  @Delete(':id/permanent')
  async removePermanent(@Param('id', ParseUUIDPipe) id: string) {
    return await this.processingTypeService.removePermanent(id);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Delete(':id')
  async removeSoft(@Param('id', ParseUUIDPipe) id: string) {
    return await this.processingTypeService.removeSoft(id);
  }
}
