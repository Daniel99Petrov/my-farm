import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { Repository } from 'typeorm';
import { FarmService } from 'src/farm/farm.service';
import { ProcessingService } from 'src/processing/processing.service';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
    private readonly farmService: FarmService,
    private readonly processingService: ProcessingService,
  ) {}
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

  async findOne(id: string, options?: { relations?: string[] }) {
    if (!id) {
      return null;
    }
    const machine = await this.machineRepository.findOne({
      where: { id },
      relations: options?.relations,
    });
    return machine;
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
