import { Role } from 'src/auth/auth.role.enum';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  roles?: Role[];
}
