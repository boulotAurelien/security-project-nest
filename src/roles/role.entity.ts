import { Role } from 'src/auth/auth.role.enum';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Role,
  })
  value: Role;

  @ManyToOne(() => User, (user) => user.roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
