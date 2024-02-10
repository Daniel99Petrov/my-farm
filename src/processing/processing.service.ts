import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Processing } from './entities/processing.entity';
import { EntityManager, Repository } from 'typeorm';
import { Machine } from 'src/machine/entities/machine.entity';
import { GrowingPeriod } from 'src/growing-period/entities/growing-period.entity';

@Injectable()
export class ProcessingService {
  constructor(
    @InjectRepository(Processing)
    private readonly processingRepository: Repository<Processing>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  async findAll() {
    return await this.processingRepository.find();
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    const processing = await this.processingRepository.findOne({
      where: { id },
    });
    return processing;
  }
  async findAllByCondition(condition: any) {
    if (!condition) return null;
    const processings = await this.processingRepository.find({
      where: condition,
      order: {
        date: 'DESC',
      },
    });
    return processings;
  }
  async create(
    growingPeriodId: string,
    processingTypeId: string,
    machineId: string,
    date: Date,
  ) {
    const growingPeriodFarmId = await this.entityManager
      .getRepository(GrowingPeriod)
      .createQueryBuilder('gp')
      .innerJoin('field', 'f', 'f.id = gp.fieldId')
      .where('gp.id = :growingPeriodId', { growingPeriodId })
      .select('f.farmId', 'farmId')
      .getRawOne();

    const machineFarmId = await this.entityManager
      .getRepository(Machine)
      .createQueryBuilder('machine')
      .where('machine.id = :machineId', { machineId })
      .select('machine.farmId', 'farmId')
      .getRawOne();

    if (machineFarmId.farmId !== growingPeriodFarmId.farmId) {
      throw new BadRequestException(
        `Machine with id ${machineId} is not in this farm. Please select another machine`,
      );
    }
    const processing = this.processingRepository.create({
      growingPeriodId,
      processingTypeId,
      machineId,
      date,
    });
    const createdProcessing = await this.processingRepository.save(processing);
    const { id, created, updated, deleted } = createdProcessing;
    return {
      id,
      growingPeriodId,
      machineId,
      processingTypeId,
      date,
      created,
      updated,
      deleted,
    };
  }

  async removePermanent(id: string) {
    const processing = await this.findOne(id);

    if (!processing) {
      throw new NotFoundException('Processing not found');
    }

    await this.processingRepository.remove(processing);
    return { success: true, message: id };
  }

  async removeSoft(id: string) {
    const processing = await this.findOne(id);

    if (!processing) {
      throw new NotFoundException('Processing not found');
    }

    await this.processingRepository.softRemove(processing);
    return { success: true, message: id };
  }
}
