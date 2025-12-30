import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './enities/user.entites';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() payload: Partial<User>) {
    return this.userService.createUser(payload);
  }

  @Get()
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @UseGuards(AuthGuard('admin'))
  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }
}
