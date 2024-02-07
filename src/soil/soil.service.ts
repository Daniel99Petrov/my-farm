import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Soil } from './entities/soil.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SoilService {
  constructor(
    @InjectRepository(Soil) private soilRepository: Repository<Soil>,
  ) {}
  async findAll() {
    return await this.soilRepository.find();
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    const soil = await this.soilRepository.findOne({
      where: { id },
    });
    return soil;
  }
  async exists(id: string): Promise<boolean> {
    const soil = await this.soilRepository.findOne({ where: { id } });
    return !!soil;
  }
  async create(name: string) {
    const soilCheck = await this.soilRepository.find({ where: { name } });
    if (soilCheck.length) {
      throw new BadRequestException('Soil already exists');
    }
    const soil = this.soilRepository.create({ name });
    const createdSoil = await this.soilRepository.save(soil);
    const { id, created, updated, deleted } = createdSoil;
    return { id, name, created, updated, deleted };
  }

  async update(id: string, attrs: Partial<Soil>) {
    const soil = await this.findOne(id);
    if (!soil) {
      throw new NotFoundException('Soil not found');
    }
    Object.assign(soil, attrs);
    return this.soilRepository.save(soil);
  }

  async removePermanent(id: string) {
    const soil = await this.findOne(id);

    if (!soil) {
      throw new NotFoundException('Soil not found');
    }

    await this.soilRepository.remove(soil);
    return { success: true, message: id };
  }

  async removeSoft(id: string) {
    const soil = await this.findOne(id);

    if (!soil) {
      throw new NotFoundException('Soil not found');
    }

    await this.soilRepository.softRemove(soil);
    return id;
  }
}
