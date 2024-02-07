import { Injectable, NotFoundException } from '@nestjs/common';
import { CoordinatesDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { Repository } from 'typeorm';
// import { FarmService } from 'src/farm/farm.service';
// import { SoilService } from 'src/soil/soil.service';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
    // private readonly farmService: FarmService,
    // private readonly soilService: SoilService,
  ) {}

  async findAll() {
    return await this.fieldRepository.find();
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    const field = await this.fieldRepository.findOne({
      where: { id },
    });
    return field;
  }
  async findAllByCondition(condition: any) {
    if (!condition) return null;
    const fields = await this.fieldRepository.find({
      where: condition,
    });
    return fields;
  }
  async findAllByFarm(farmId: string) {
    const fields = this.findAllByCondition({ farmId });
    return fields;
  }

  async create(
    name: string,
    borders: CoordinatesDto,
    farmId: string,
    soilId: string,
  ) {
    // const farmExists = await this.farmService.exists(farmId);
    // if (!farmExists) {
    //   throw new NotFoundException(`Farm with ID ${farmId} not found`);
    // }

    // const soilExists = await this.soilService.exists(soilId);
    // if (!soilExists) {
    //   throw new NotFoundException(`Soil with ID ${soilId} not found`);
    // }

    // without the checks, soft deleted could be chosen
    const field = this.fieldRepository.create({
      name,
      borders,
      farmId,
      soilId,
    });
    const createdField = await this.fieldRepository.save(field);
    const { id, created, updated, deleted } = createdField;
    return { id, name, borders, farmId, soilId, created, updated, deleted };
  }

  async updateField(id: string, updateFieldDto: UpdateFieldDto) {
    const field = await this.findOne(id);
    if (!field) {
      throw new NotFoundException(`Field with id ${id} not found`);
    }
    Object.assign(field, updateFieldDto);
    return this.fieldRepository.save(field);
  }

  async removePermanent(id: string) {
    const field = await this.findOne(id);

    if (!field) {
      throw new NotFoundException('Field not found');
    }
    await this.fieldRepository.remove(field);
    return { success: true, message: id };
  }

  async removeSoft(id: string) {
    const field = await this.findOne(id);

    if (!field) {
      throw new NotFoundException('Field not found');
    }

    await this.fieldRepository.softRemove(field);
    return { success: true, message: id };
  }
}
