import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GrowingPeriod } from './entities/growing-period.entity';
import { Repository } from 'typeorm';
// import { FieldService } from 'src/field/field.service';
// import { CropService } from 'src/crop/crop.service';

@Injectable()
export class GrowingPeriodService {
  constructor(
    @InjectRepository(GrowingPeriod)
    private readonly growingPeriodRepository: Repository<GrowingPeriod>,
    // private readonly cropService: CropService,
    // private readonly fieldService: FieldService,
  ) {}
  async findAll() {
    return await this.growingPeriodRepository.find();
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    const growingPeriod = await this.growingPeriodRepository.findOne({
      where: { id },
    });
    return growingPeriod;
  }
  async findAllByCondition(condition: any) {
    if (!condition) return null;
    const growingPeriods = await this.growingPeriodRepository.find({
      where: condition,
    });
    return growingPeriods;
  }

  async create(cropId: string, fieldId: string) {
    // const crop = await this.cropService.findOne(cropId);
    // if (!crop) {
    //   throw new BadRequestException(`There is no crop with id ${cropId}`);
    // }
    // const field = await this.fieldService.findOne(fieldId);
    // if (!field) {
    //   throw new BadRequestException(`There is no field with id ${fieldId}`);
    // }

    const growingPeriod = this.growingPeriodRepository.create({
      cropId,
      fieldId,
    });
    const createdPeriod =
      await this.growingPeriodRepository.save(growingPeriod);
    const { id, created, updated, deleted } = createdPeriod;
    return { id, cropId, fieldId, created, updated, deleted };
  }

  async removePermanent(id: string) {
    const growingPeriod = await this.findOne(id);

    if (!growingPeriod) {
      throw new NotFoundException('Growing period not found');
    }
    await this.growingPeriodRepository.remove(growingPeriod);
    return { success: true, message: id };
  }

  async removeSoft(id: string) {
    const growingPeriod = await this.findOne(id);

    if (!growingPeriod) {
      throw new NotFoundException('Growing period not found');
    }

    await this.growingPeriodRepository.softRemove(growingPeriod);
    return { success: true, message: id };
  }
}
