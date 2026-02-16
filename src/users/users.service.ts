import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RoleEntity } from 'src/roles/role.entity';
import { Role } from 'src/auth/auth.role.enum';
import { CreateUserDto } from './dto/user.dto';

export type UserFix = { userId: number; username: string; password: string };

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  findOneFixed(username: string): UserFix | undefined {
    return this.users.find((user) => user.username === username);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const roles =
      dto?.roles?.map((roleValue: Role) => {
        const role = new RoleEntity();
        role.value = roleValue;
        return role;
      }) || [];

    const user: User = this.usersRepository.create({ ...dto, roles });
    return await this.usersRepository.save(user);
  }
}
