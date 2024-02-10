import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { EntityManager, Repository } from 'typeorm';
import { FarmService } from 'src/farm/farm.service';
import { ProcessingService } from 'src/processing/processing.service';
import { GrowingPeriod } from 'src/growing-period/entities/growing-period.entity';
import { Field } from 'src/field/entities/field.entity';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
    private readonly farmService: FarmService,
    private readonly processingService: ProcessingService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findAll() {
    return await this.machineRepository.find();
  }
  async findAllByCondition(condition: any) {
    if (!condition) return null;
    const fields = await this.machineRepository.find({
      where: condition,
    });
    return fields;
  }

  async findAllByField(fieldId: string) {
    if (!fieldId) return null;
    const fieldFarmId = await this.entityManager
      .getRepository(Field)
      .createQueryBuilder('field')
      .where('field.id = :fieldId', { fieldId })
      .select('field.farmId', 'farmId')
      .getRawOne();
    const farmId = fieldFarmId.farmId;

    const machines = this.findAllByCondition({ farmId });
    return machines;
  }
  async findAllByGrowingPeriod(growingPeriodId: string) {
    if (!growingPeriodId) return null;
    const growingPeriodFarmId = await this.entityManager
      .getRepository(GrowingPeriod)
      .createQueryBuilder('gp')
      .innerJoin('field', 'f', 'f.id = gp.fieldId')
      .where('gp.id = :growingPeriodId', { growingPeriodId })
      .select('f.farmId', 'farmId')
      .getRawOne();
    const farmId = growingPeriodFarmId.farmId;

    const machines = this.findAllByCondition({ farmId });
    return machines;
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    const machine = await this.machineRepository.findOne({
      where: { id },
    });
    return machine;
  }

  async create(
    brand: string,
    model: string,
    registrationNumber: string,
    farmId: string,
  ) {
    const farm = await this.farmService.findOne(farmId);
    if (!farm) {
      throw new BadRequestException(`There is no farm with id ${farmId}`);
    }

    const machine = this.machineRepository.create({
      brand,
      model,
      registrationNumber,
      farmId,
    });
    const createdMachine = await this.machineRepository.save(machine);
    const { id, created, updated, deleted } = createdMachine;
    return {
      id,
      model,
      brand,
      registrationNumber,
      farmId,
      created,
      updated,
      deleted,
    };
  }
  async update(id: string, updateMachineDto: UpdateMachineDto) {
    const machine = await this.findOne(id);
    if (!machine) {
      throw new NotFoundException('Machine not found');
    }

    Object.assign(machine, updateMachineDto);
    const updated = await this.machineRepository.save(machine);
    return updated.id;
  }
  async transfer(machineId: string, fromFarmId: string, farmId: string) {
    const fromFarm = await this.farmService.findOne(fromFarmId);
    const toFarm = await this.farmService.findOne(farmId);
    const machine = await this.findOne(machineId);

    if (!machine || !fromFarm || !toFarm) {
      throw new NotFoundException('Machine or farms not found');
    }
    if (machine.farmId !== fromFarmId) {
      throw new BadRequestException(
        `Machine with id ${machineId} is not in farm ${fromFarmId}`,
      );
    }
    const processings = await this.processingService.findAllByCondition({
      machineId: machineId,
    });
    if (processings.length > 0) {
      throw new BadRequestException(
        'You have processings with this machine in current farm. Delete the processings or just create new machine',
      );
    }
    Object.assign(machine, farmId);
    return await this.machineRepository.save(machine);
  }

  async removePermanent(id: string) {
    const machine = await this.findOne(id);

    if (!machine) {
      throw new NotFoundException('Machine not found');
    }
    await this.machineRepository.remove(machine);
    return { success: true, message: id };
  }

  async removeSoft(id: string) {
    const machine = await this.findOne(id);

    if (!machine) {
      throw new NotFoundException('Machine not found');
    }

    await this.machineRepository.softRemove(machine);
    return { success: true, message: id };
  }
}
