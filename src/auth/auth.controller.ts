import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(body, res);
  }

  @UseGuards(AuthGuard('user','admin'))
  @Post('refresh-token')
  async refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req);
  }
}
