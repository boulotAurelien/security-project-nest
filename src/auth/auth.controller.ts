import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService, UserProfile } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public, Roles } from './auth.decorator';
import { RoleGuard } from './auth.role.guard';
import { Role } from './auth.role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(
      signInDto.username,
      signInDto.password,
      signInDto.roles,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: UserProfile }) {
    return req.user;
  }

  @Public()
  @UseGuards(AuthGuard)
  @Get('public')
  getPublic() {
    return 'public';
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Get('admin')
  getAdmin() {
    return 'admin';
  }
}
