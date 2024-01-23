import { Injectable, NotFoundException } from '@nestjs/common';
import { ProcessingType } from './entities/processing-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ProcessingTypeService {
  constructor(
    @InjectRepository(ProcessingType)
    private readonly processingTypeRepo: Repository<ProcessingType>,
  ) {}
  async findAll() {
    return await this.processingTypeRepo.find();
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    const processingType = await this.processingTypeRepo.findOne({
      where: { id },
    });
    return processingType;
  }
  async create(name: string) {
    const processingType = this.processingTypeRepo.create({ name });
    const createdType = await this.processingTypeRepo.save(processingType);
    const { id, created, updated, deleted } = createdType;
    return { id, name, created, updated, deleted };
  }

  async update(id: string, attrs: Partial<ProcessingType>) {
    const processingType = await this.findOne(id);
    if (!processingType) {
      throw new NotFoundException('Processing type not found');
    }
    Object.assign(processingType, attrs);
    return this.processingTypeRepo.save(processingType);
  }

  async removePermanent(id: string) {
    const processingType = await this.findOne(id);
    if (!processingType) {
      throw new NotFoundException('Processing type not found');
    }
    await this.processingTypeRepo.remove(processingType);
    return { success: true, message: id };
  }

  async removeSoft(id: string) {
    const processingType = await this.findOne(id);
    if (!processingType) {
      throw new NotFoundException('Crop not found');
    }
    await this.processingTypeRepo.softRemove(processingType);
    return { success: true, message: id };
  }
}
