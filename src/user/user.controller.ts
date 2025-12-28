import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './enities/user.entites';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() payload: Partial<User>) {
    return await this.userService.createUser(payload);
  }

  @Post('/all')
  async fildAllUsers() {
    return await this.userService.fildAllUsers();
  }
}
