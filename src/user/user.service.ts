import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './enities/user.entites';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
    return await this.userRepository.save(newUser);
  }

  async fildAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
