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
import { CropService } from './crop.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserRoles } from 'src/user/user-role.enum';
import { Roles } from 'src/user/roles.decorator';

@Controller('crop')
@UseGuards(AuthGuard)
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Get()
  async findAll() {
    return await this.cropService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.cropService.findOne(id);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Post()
  async create(@Body() createCropDto: CreateCropDto) {
    return await this.cropService.create(createCropDto.name);
  }

  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createCropDto: CreateCropDto,
  ) {
    return await this.cropService.update(id, createCropDto);
  }
  @Roles(UserRoles.OWNER)
  @Delete(':id/permanent')
  async removePermanent(@Param('id', ParseUUIDPipe) id: string) {
    return await this.cropService.removePermanent(id);
  }
  @Roles(UserRoles.OWNER, UserRoles.OPERATOR)
  @Delete(':id')
  async removeSoft(@Param('id', ParseUUIDPipe) id: string) {
    return await this.cropService.removeSoft(id);
  }
}
