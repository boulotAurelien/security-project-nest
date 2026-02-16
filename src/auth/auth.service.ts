import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from './auth.role.enum';

export type UserProfile = {
  sub: number;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
    roles: Role[] = [Role.User],
  ): Promise<{ access_token: string }> {
    const user = this.usersService.findOneFixed(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username, roles: roles };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
