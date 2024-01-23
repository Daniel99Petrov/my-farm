import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(email: string, username: string, password: string) {
    const user = this.userRepository.create({ email, username, password });

    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string, options?: { relations?: string[] }) {
    if (!id) {
      return null;
    }
    const user = await this.userRepository.findOne({
      where: { id },
      relations: options?.relations,
    });
    return user;
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }
  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
  async removePermanent(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
    return { success: true, message: id };
  }
  async removeSoft(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.softRemove(user);
    return { success: true, message: id };
  }
}
