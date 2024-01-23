import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async findAll() {
    return await this.farmRepository.find();
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    const farm = await this.farmRepository.findOne({
      where: { id },
    });
    return farm;
  }
  async exists(id: string): Promise<boolean> {
    const farm = await this.farmRepository.findOne({ where: { id } });
    return !!farm;
  }
  async create(name: string, latitude: string, longitude: string) {
    const locationCheck = await this.farmRepository.find({
      where: {
        location: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      },
    });
    if (locationCheck.length) {
      throw new BadRequestException('Farm on this location already exists');
    }

    const location = {
      type: 'Point',
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };
    const farm = this.farmRepository.create({ name, location });
    const createdFarm = await this.farmRepository.save(farm);
    const { id, created, updated, deleted } = createdFarm;
    return { id, name, location, created, updated, deleted };
  }
  async update(id: string, updateFarmDto: UpdateFarmDto) {
    const farm = await this.findOne(id);

    if (!farm) {
      throw new NotFoundException('Farm not found');
    }

    // Check for uniqueness of lat and long combined
    if (updateFarmDto.latitude && updateFarmDto.longitude) {
      const location = {
        type: 'Point',
        coordinates: [
          parseFloat(updateFarmDto.longitude),
          parseFloat(updateFarmDto.latitude),
        ],
      };
      const farmWithSameLocation = await this.farmRepository.findOne({
        where: {
          location,
        },
      });

      if (farmWithSameLocation && farmWithSameLocation.id !== id) {
        throw new BadRequestException(
          'Farm with the same location already exists',
        );
      }
      updateFarmDto.location = location;
    }

    Object.assign(farm, updateFarmDto);
    return this.farmRepository.save(farm);
  }

  async findFarmWithMostMachines(entityManager: EntityManager) {
    const query = entityManager
      .createQueryBuilder(Farm, 'f')
      .innerJoin('f.machines', 'm')
      .select('f', 'farm')
      .addSelect('COUNT(m.id)')
      .groupBy('f.id')
      .orderBy('COUNT(m.id)', 'DESC')
      .limit(1);

    const result = await query.getOneOrFail();
    return { farm: result };
  }

  async findMostCommonSoilInFarm() {
    const rankedSoils = await this.farmRepository
      .createQueryBuilder('farm')
      .leftJoinAndSelect('farm.fields', 'field')
      .leftJoinAndSelect('field.soil', 'soil')
      .select([
        'farm.id AS farm_id',
        'farm.name AS farm_name',
        'soil.id AS soil_id',
        'soil.name AS soil_name',
        'COUNT(*) AS count',
        'ROW_NUMBER() OVER (PARTITION BY farm.id ORDER BY COUNT(*) DESC) AS rn',
      ])
      .groupBy('farm.id, soil.id')
      .getRawMany();
    console.log(rankedSoils);
    const result = rankedSoils.filter((row) => row.rn === '1' && row.soil_id);
    const filteredResults = result.map(({ farm_id, soil_id, count }) => ({
      farm_id,
      soil_id,
      count,
    }));
    console.log(filteredResults);
    return filteredResults;
  }
  async findCountOfFieldsPerFarmAndCrop() {
    const fieldsCount = await this.farmRepository
      .createQueryBuilder('farm')
      .leftJoinAndSelect('farm.fields', 'field')
      .leftJoinAndSelect('field.growingPeriods', 'growingPeriod')
      .leftJoinAndSelect('growingPeriod.crop', 'crop')
      .select([
        'farm.id AS farm_id',
        'farm.name AS farm_name',
        'crop.id AS crop_id',
        'crop.name AS crop_name',
        'COUNT(*) AS count',
      ])
      .groupBy('farm.id, crop.id')
      .orderBy('farm.id')
      .getRawMany();
    console.log(fieldsCount);
    const result = fieldsCount.filter((row) => row.crop_id);
    console.log(result);
    return result;
  }

  async removePermanent(id: string) {
    const farm = await this.findOne(id);

    if (!farm) {
      throw new NotFoundException('farm not found');
    }
    await this.farmRepository.remove(farm);
    return { success: true, message: id };
  }

  async removeSoft(id: string) {
    const farm = await this.findOne(id);

    if (!farm) {
      throw new NotFoundException('farm not found');
    }

    await this.farmRepository.softRemove(farm);
    return { success: true, message: id };
  }
}
