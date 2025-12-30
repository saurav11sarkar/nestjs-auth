import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './enities/user.entites';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(payload: Partial<User>): Promise<User> {
    if (!payload.password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const newUser = this.userRepository.create({
      ...payload,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
