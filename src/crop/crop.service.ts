import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Crop } from './entities/crop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CropService {
  constructor(@InjectRepository(Crop) private cropRepo: Repository<Crop>) {}
  async findAll() {
    return await this.cropRepo.find();
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    const crop = await this.cropRepo.findOne({
      where: { id },
    });
    return crop;
  }

  async create(name: string) {
    const crop = this.cropRepo.create({ name });
    const createdCrop = await this.cropRepo.save(crop);
    const { id, created, updated, deleted } = createdCrop;
    return { id, name, created, updated, deleted };
  }

  async update(id: string, attrs: Partial<Crop>) {
    const crop = await this.findOne(id);
    if (!crop) {
      throw new NotFoundException('Soil not found');
    }
    Object.assign(crop, attrs);
    return this.cropRepo.save(crop);
  }

  async removePermanent(id: string) {
    const crop = await this.findOne(id);

    if (!crop) {
      throw new NotFoundException('Crop not found');
    }
    await this.cropRepo.remove(crop);
    return { success: true, message: id };
  }

  async removeSoft(id: string) {
    const crop = await this.findOne(id);
    if (!crop) {
      throw new NotFoundException('Crop not found');
    }
    await this.cropRepo.softRemove(crop);
    return { success: true, message: id };
  }
}
