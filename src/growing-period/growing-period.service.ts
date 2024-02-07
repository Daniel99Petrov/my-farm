import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { GrowingPeriod } from './entities/growing-period.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateGrowingPeriodDto } from './dto/create-growing-period.dto';
import { ProcessingService } from 'src/processing/processing.service';
import { Machine } from 'src/machine/entities/machine.entity';
import { Field } from 'src/field/entities/field.entity';
// import { FieldService } from 'src/field/field.service';
// import { CropService } from 'src/crop/crop.service';

@Injectable()
export class GrowingPeriodService {
  constructor(
    @InjectRepository(GrowingPeriod)
    private readonly growingPeriodRepository: Repository<GrowingPeriod>,
    private readonly processingService: ProcessingService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
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
      order: {
        created: 'DESC',
      },
    });
    return growingPeriods;
  }

  async create(createGrowingPeriodDto: CreateGrowingPeriodDto) {
    const { cropId, fieldId, processingTypeId, machineId, date } =
      createGrowingPeriodDto;

    const machineFarmId = await this.entityManager
      .getRepository(Machine)
      .createQueryBuilder('machine')
      .where('machine.id = :machineId', { machineId })
      .select('machine.farmId', 'farmId')
      .getRawOne();

    const fieldFarmId = await this.entityManager
      .getRepository(Field)
      .createQueryBuilder('field')
      .where('field.id = :fieldId', { fieldId })
      .select('field.farmId', 'farmId')
      .getRawOne();
    if (machineFarmId.farmId !== fieldFarmId.farmId) {
      throw new BadRequestException(
        `Machine with id ${machineId} is not in this farm. Please select another machine`,
      );
    }
    const growingPeriod = this.growingPeriodRepository.create({
      cropId,
      fieldId,
    });
    const createdPeriod =
      await this.growingPeriodRepository.save(growingPeriod);
    const { id, created, updated, deleted } = createdPeriod;
    console.log({ id, processingTypeId, machineId, date, fieldId });

    const createdProcessing = await this.processingService.create(
      id,
      processingTypeId,
      machineId,
      date,
    );
    console.log(createdProcessing);
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
