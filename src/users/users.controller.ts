import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

interface MySession {
  visits: number;
  [key: string]: any;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get('axios')
  getAllAxios(@Session() session: MySession) {
    session.visits = session.visits ? session.visits + 1 : 1;
    console.log('session.visits: ' + session.visits);
    return this.usersService.findAllAxios();
  }
}
